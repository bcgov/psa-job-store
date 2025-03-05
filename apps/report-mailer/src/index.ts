import { createObjectCsvWriter } from 'csv-writer';
import dotenv from 'dotenv';
import fs from 'fs';
import moment from 'moment-timezone';
import nodemailer from 'nodemailer';
import path from 'path';
import { Client } from 'pg';

dotenv.config();

// Directories for queries and recipients config
const queriesDir = process.env.QUERIES_DIR || 'src/queries';
const recipientsDir = process.env.RECIPIENTS_DIR || 'src/recipients';
const isLocal = Boolean(process.env.LOCAL) || false;

console.log(`Queries Directory: ${queriesDir}`);
console.log(`Recipients Directory: ${recipientsDir}`);

// Function to load recipient configurations
function loadRecipientConfig(): Array<{
  email: string;
  reports: string[];
  organizations: string[];
}> {
  console.log('Loading recipient configurations...');
  const recipients = [];
  const files = fs.readdirSync(recipientsDir).filter((file) => !file.startsWith('..'));
  console.log(`Recipient files found: ${files.join(', ')}`);
  for (const file of files) {
    // if (!stats.isFile()) {
    //   console.log(`Skipping non-file: ${file}`);
    //   continue;
    // }
    const email = file;
    console.log(`Reading recipient file: ${email}`);
    const content = fs.readFileSync(path.join(recipientsDir, file), 'utf-8');
    const { reports, organizations } = JSON.parse(content);
    console.log(`config for ${email}: ${content}`);
    console.log(`Reports for ${email}: ${reports}`);
    console.log(`Organizations for ${email}: ${organizations}`);
    console.log(`Reports for ${email}: ${reports?.join(', ')}`);
    console.log(`Organizations for ${email}: ${organizations?.join(', ')}`);
    recipients.push({ email, reports, organizations });
  }
  return recipients;
}

async function executeQueriesAndWriteCSVs(
  client: Client,
  recipient: { email: string; reports: string[]; organizations: string[] },
  startDate: string,
  endDate: string,
) {
  console.log(`Executing queries for recipient: ${recipient.email}`);
  const executedQueries = new Map<string, string>(); // Map of query file name to output path

  for (const queryFile of recipient.reports) {
    console.log(`Processing query file: ${queryFile}`);
    const queryPath = path.join(queriesDir, queryFile);
    if (!fs.existsSync(queryPath)) {
      console.error(`Query file not found: ${queryPath}`);
      continue;
    }
    const queryText = fs.readFileSync(queryPath, 'utf-8');
    // Modify the output file name to include the recipient's email
    const outputFileName = `${path.basename(queryFile, '.sql')}_${recipient.email.replace('@', '_at_')}.csv`;
    const outputPath = path.join('/tmp', outputFileName);

    try {
      console.log(`Executing query: ${queryFile}`);

      // Parse required parameters from the SQL file
      let requiredParams: string[] = [];
      const lines = queryText.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('--')) {
          const paramMatch = trimmedLine.match(/^--\s*requires_parameters:\s*(.*)$/i);
          if (paramMatch) {
            requiredParams = paramMatch[1]
              .split(',')
              .map((param) => param.trim())
              .filter((param) => param.length > 0);
            break;
          }
        } else if (trimmedLine === '') {
          // Skip empty lines
          continue;
        } else {
          // Non-comment, non-empty line - stop checking
          break;
        }
      }

      // Build parameters array based on required parameters
      const parameters = requiredParams.map((paramName) => {
        switch (paramName) {
          case 'startDate':
            return startDate;
          case 'endDate':
            return endDate;
          case 'organizations':
            return recipient.organizations;
          default:
            throw new Error(`Unknown parameter '${paramName}' required by query '${queryFile}'`);
        }
      });

      // Ensure correct number of placeholders in query
      const parameterPlaceholderCount = Array.from(new Set(queryText.match(/\$\d+/g) || [])).length;
      if (parameters.length !== parameterPlaceholderCount) {
        throw new Error(
          `Mismatch between number of parameters (${parameters.length}) and placeholders (${parameterPlaceholderCount}) in query '${queryFile}'`,
        );
      }

      // Execute the query
      const res = await client.query(queryText, parameters);

      const records = res.rows;

      if (records.length > 0) {
        const csvWriter = createObjectCsvWriter({
          path: outputPath,
          header: Object.keys(records[0]).map((key) => ({ id: key, title: key })),
        });

        await csvWriter.writeRecords(records);
        console.log(`Data written to ${outputPath}`);
        executedQueries.set(queryFile, outputPath);
      } else {
        console.log(`No data returned for query ${queryFile}.`);
      }
    } catch (error) {
      console.error(`Error executing query ${queryFile}:`, error);
      throw error; // Rethrow error to handle it in main function
    }
  }

  return executedQueries;
}

async function sendEmails(
  recipients: Array<{ email: string; reports: string[]; organizations: string[] }>,
  executedQueries: Map<string, string>,
  startDate: string,
  endDate: string,
) {
  console.log('Preparing to send emails...');
  const emailFrom = 'JobStore@gov.bc.ca';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Use STARTTLS
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  for (const recipient of recipients) {
    const toEmail = `${recipient.email}@gov.bc.ca`;
    console.log(`Preparing email for: ${toEmail}`);
    const attachments = [];

    for (const report of recipient.reports) {
      const outputFileName = `${path.basename(report, '.sql')}_${recipient.email.replace('@', '_at_')}.csv`;
      const outputPath = path.join('/tmp', outputFileName);
      if (fs.existsSync(outputPath)) {
        console.log(`Attaching report ${report} for ${toEmail}`);
        attachments.push({
          filename: `${path.basename(report, '.sql')}.csv`,
          path: outputPath,
        });
      } else {
        console.log(`Report ${report} not found or no data. Skipping attachment for ${toEmail}.`);
      }
    }

    if (attachments.length > 0) {
      const mailOptions = {
        from: emailFrom,
        to: toEmail,
        subject: `JobStore ${moment(startDate).format('MMMM')} Monthly Report`,
        text: `Please find the attached report(s) for the period from ${startDate} to ${endDate}.
              \n\nThese reports are filtered by the organizations you are associated with. If you would like to inquire about changing your access, you can reply to this email.
              \nIf a report you normally see is missing, it may be because there was no data for that report during the period.`,
        attachments,
      };

      try {
        console.log(`Sending reports to ${toEmail} from ${emailFrom}`);
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toEmail}`);
      } catch (error) {
        console.error(`Error sending email to ${toEmail}:`, error);
        throw error;
      }
    } else {
      console.log(`No attachments to send to ${toEmail}. Skipping email.`);
    }
  }
}

async function main() {
  try {
    console.log('Starting the report mailer application...');

    // Load recipient configurations
    const recipientConfigs = loadRecipientConfig();
    console.log(`Loaded recipient configurations for ${recipientConfigs.length} recipient(s).`);

    // Collect all unique queries needed
    const queriesNeeded = new Set<string>();
    recipientConfigs.forEach(({ reports }) => {
      reports.forEach((report) => queriesNeeded.add(report));
    });
    console.log(`Unique queries needed: ${Array.from(queriesNeeded).join(', ')}`);

    // Load queries from files
    const availableQueries = new Set(fs.readdirSync(queriesDir).filter((file: string) => file.endsWith('.sql')));
    const missingQueries = Array.from(queriesNeeded).filter((q) => !availableQueries.has(q));

    if (missingQueries.length > 0) {
      console.error('Missing query files:', missingQueries);
      process.exit(1);
    }

    // Read start and end dates from environment variables, or calculate defaults
    let startDate: string;
    let endDate: string;

    if (process.env.START_DATE && process.env.END_DATE) {
      startDate = process.env.START_DATE;
      endDate = process.env.END_DATE;
      console.log(`Using provided start and end dates from environment variables.`);
    } else {
      // Calculate start and end dates for the previous month
      const now = moment().tz('America/Vancouver'); // Set to your desired timezone
      console.log(`today is: ${now.format('YYYY-MM-DD')}`);
      endDate = now.startOf('month').format('YYYY-MM-DD');
      startDate = now.startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
      console.log(`No start/end dates provided. Using default values for previous month.`);
    }

    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);

    // Connect to the database
    console.log('Connecting to the database...');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: !isLocal
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
    });

    await client.connect();
    console.log('Connected to the database');

    // For each recipient, execute their queries
    for (const recipient of recipientConfigs) {
      console.log(`Processing recipient: ${recipient.email}`);

      // Execute queries and write CSVs for this recipient
      const executedQueries = await executeQueriesAndWriteCSVs(client, recipient, startDate, endDate);

      // Send email with attachments
      await sendEmails([recipient], executedQueries, startDate, endDate);

      // Clean up CSV files for this recipient
      for (const outputPath of executedQueries.values()) {
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
          console.log(`Deleted ${outputPath}`);
        }
      }
    }
    console.log('Report mailer application completed successfully.');
    await client.end();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
