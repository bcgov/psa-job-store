import { createObjectCsvWriter } from 'csv-writer';
import dotenv from 'dotenv';
import fs from 'fs';
import moment from 'moment';
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
    const reportsContent = fs.readFileSync(path.join(recipientsDir, file), 'utf-8');
    const reports = JSON.parse(reportsContent);
    console.log(`Reports for ${email}: ${reports.join(', ')}`);
    recipients.push({ email, reports });
  }
  return recipients;
}

// Function to load queries from files
// function loadQueries(): Map<string, string> {
//   console.log('Loading SQL queries...');
//   const queryMap = new Map<string, string>();
//   const files = fs.readdirSync(queriesDir).filter((file) => file.endsWith('.sql'));
//   console.log(`Query files found: ${files.join(', ')}`);
//   for (const file of files) {
//     const query = fs.readFileSync(path.join(queriesDir, file), 'utf-8');
//     console.log(`Loaded query file: ${file}`);
//     queryMap.set(file, query);
//   }
//   return queryMap;
// }

async function executeQueriesAndWriteCSVs(client: Client, queries: Set<string>, startDate: string, endDate: string) {
  console.log('Executing queries and writing CSVs...');
  const executedQueries = new Map<string, string>(); // Map of query file name to output path

  for (const queryFile of queries) {
    console.log(`Processing query file: ${queryFile}`);
    const queryPath = path.join(queriesDir, queryFile);
    if (!fs.existsSync(queryPath)) {
      console.error(`Query file not found: ${queryPath}`);
      continue;
    }
    const queryText = fs.readFileSync(queryPath, 'utf-8');
    const outputFileName = `${path.basename(queryFile, '.sql')}.csv`;
    const outputPath = path.join('/tmp', outputFileName);

    try {
      console.log(`Executing query: ${queryFile}`);

      // Determine if the query requires parameters
      let requiresParams = false;
      const lines = queryText.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim().toLowerCase();
        if (trimmedLine.startsWith('--')) {
          if (trimmedLine.includes('requires_parameters: true')) {
            requiresParams = true;
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

      let res;
      if (requiresParams) {
        // Query requires parameters
        res = await client.query(queryText, [startDate, endDate]);
      } else {
        // Query does not require parameters
        res = await client.query(queryText);
      }

      const records = res.rows;

      if (records.length > 0) {
        // Create CSV Writer
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
  recipientConfigs: Array<{ email: string; reports: string[] }>,
  executedQueries: Map<string, string>,
  startDate: string,
  endDate: string,
) {
  console.log('Preparing to send emails...');
  console.log(`host ${process.env.SMTP_HOST}`);
  const emailFrom = 'JobStore@gov.bc.ca'; //process.env.EMAIL_FROM ?? 'JobStore@gov.bc.ca';
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Use STARTTLS
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  for (const { email, reports } of recipientConfigs) {
    const toEmail = `${email}@gov.bc.ca`;
    console.log(`Preparing email for: ${toEmail}`);
    const attachments = [];

    for (const report of reports) {
      const outputPath = executedQueries.get(report);
      if (outputPath && fs.existsSync(outputPath)) {
        console.log(`Attaching report ${report} for ${toEmail}`);
        attachments.push({
          filename: path.basename(outputPath),
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
        text: `Please find the attached report(s) for the period from ${startDate} to ${endDate}.`,
        attachments,
      };

      try {
        console.log(`Sending reports to ${toEmail} from ${emailFrom}`);
        // eslint-disable-next-line no-await-in-loop
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toEmail}:`, info.messageId);
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
      startDate = moment().startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
      endDate = moment().startOf('month').format('YYYY-MM-DD');
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
            rejectUnauthorized: false, // Adjust based on your SSL requirements
          }
        : undefined,
    });

    await client.connect();
    console.log('Connected to the database');

    // Execute queries and write CSVs
    const executedQueries = await executeQueriesAndWriteCSVs(client, queriesNeeded, startDate, endDate);

    // Send emails with attachments
    await sendEmails(recipientConfigs, executedQueries, startDate, endDate);

    // Clean up CSV files
    console.log('Cleaning up CSV files...');
    for (const outputPath of executedQueries.values()) {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
        console.log(`Deleted ${outputPath}`);
      }
    }

    console.log('Report mailer application completed successfully.');
    await client.end();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1); // Exit with failure
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
