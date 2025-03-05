# Report-Mailer Utility in PSA Job Store

## Purpose

The report-mailer is a specialized utility designed to generate and distribute automated reports via email about the PSA Job Store system's activities. It's primarily focused on position requests and user activity metrics, providing stakeholders with regular insights into system usage and performance.

## Core Functionality

1. **Database Querying**:

   - Executes predefined SQL queries against the PostgreSQL database
   - Retrieves data about position requests, their statuses, and user activities
   - Supports parameterized queries with date ranges and organization filtering

2. **Report Generation**:

   - Transforms query results into CSV files
   - Creates separate reports for different metrics

3. **Email Distribution**:
   - Sends generated reports to configured recipients
   - Supports recipient-specific report configurations
   - Includes customized email content with date ranges and report descriptions

## Report Types

SQL queries are stored in the `sql-queries-config` ConfigMap, with each query as a separate key. The utility currently generates three main types of reports:

1. **Position Requests Report** (`position_requests.sql`):

   - Lists individual position requests that were completed within a specified date range
   - Includes details like position title, number, classification, submission and approval dates
   - Calculates approval time metrics (days to approve)
   - Includes organizational context (department, organization name)

2. **Position Request Counts** (`position_request_counts.sql`):

   - Provides aggregate statistics on position requests
   - Breaks down requests by status (Verification, Action Required, Review, Cancelled, Completed)
   - Distinguishes between automatically approved and verified requests

3. **New Users Report** (`new_users.sql`):
   - Tracks new user registrations in the system

## Technical Implementation

1. **Architecture**:

   - Standalone Node.js application within the monorepo
   - Designed to be run as a scheduled task (cron job)
   - Containerized for deployment in OpenShift

2. **Key Dependencies**:

   - `pg` for PostgreSQL database connections
   - `nodemailer` for email functionality
   - `csv-writer` for generating CSV reports
   - `moment-timezone` for handling date/time conversions

3. **Configuration**:

   - Uses environment variables for database connection and email settings
   - Supports recipient configuration via JSON files
   - SQL queries are stored as separate files and can be modified independently

   The job executes SQL queries against the database. Those queries are defined in a configmap object in openshift called sql-queries.configmap.yml.

   You can edit the config map directly to change the queries being run. The keys are the file names, and should end in .sql. The values should be valid SQL.

4. **Deployment**:
   - Packaged as a Docker container
   - Designed to run as a CronJob in OpenShift
   - Can be triggered manually for on-demand reporting

## OpenShift Deployment

The report-mailer is deployed as a CronJob in OpenShift with the following configuration:

### Kustomization Structure

The deployment is managed through Kustomize with the following files:

- `kustomization.yml` - Main configuration that references all other resources
- `cronjob.yml` - CronJob definition
- `configmap.yml` - Email server configuration
- `sql-queries-configmap.yml` - SQL queries for reports
- `recipients-configmap.yml` - Recipient configurations

### CronJob Configuration

1. **Schedule**:

   - Runs on the 1st day of every month at 12:00 UTC
   - Configured in `cronjob.yml` with the schedule: `"0 12 1 * *"`

2. **Container Configuration**:

   - Uses the image from Artifactory: `artifacts.developer.gov.bc.ca/af3c-gen-docker-local/report-mailer:latest`
   - Environment variables loaded from:
     - `report-mailer-config` ConfigMap
     - `secrets` Secret

3. **Volume Mounts**:

   - SQL queries mounted from `sql-queries-config` ConfigMap to `/src/queries`
   - Recipient configurations mounted from `recipients-configmap` ConfigMap to `/src/recipients`

4. **Restart Policy**:
   - Set to `OnFailure` to restart the job if it fails

### Email Configuration

The email server settings are configured in the `report-mailer-config` ConfigMap:

```yaml
data:
  SMTP_HOST: apps.smtp.gov.bc.ca
  SMTP_PORT: '25'
  SMTP_USER: ''
  SMTP_PASS: ''
  # Optional date overrides
  # START_DATE: "2024-10-01"
  # END_DATE: "2024-10-31"
```

## Workflow

1. The utility connects to the PostgreSQL database
2. It loads recipient configurations from the configured directory
3. For each recipient, it executes their configured reports with appropriate parameters
4. Results are saved as CSV files in a temporary directory
5. Emails are composed with the CSV files attached
6. Emails are sent to recipients
7. Temporary files are cleaned up

## Adding New Reports

To add a new report:

1. Create a new SQL file with your query
2. Include a comment at the top with required parameters: `-- requires_parameters: param1, param2, ...`
3. Write your SQL query with parameterized values ($1, $2, etc.)
4. Add the query to the `sql-queries-config` ConfigMap in OpenShift:

```yaml
data:
  your_new_report.sql: |
    -- requires_parameters: param1, param2
    SELECT
      ...
    FROM
      ...
    WHERE
      ...
```

5. Update recipient configurations to include the new report

## Configuring Recipients

To add or update recipients in OpenShift:

1. Edit the `recipients-configmap` ConfigMap (`@gov.bc.ca` will be automatically added during processing):

```yaml
data:
  firstName.lastName: |
    {
      "reports": ["position_requests.sql", "position_request_counts.sql", "your_new_report.sql"],
      "organizations": ["org-id-1", "org-id-2"]
    }
```

2. Each key in the ConfigMap should be an email address
3. The value should be a JSON object with:
   - `reports`: Array of SQL file names to run for this recipient
   - `organizations`: Array of organization IDs to filter reports by (if applicable)

## Running the mailer

The mailer is script that is meant to be run by a cron job.

If you would like to run it locally, you can simply run

```bash
# In development
npm run start
```

Otherwise if you want to execute a job on demand, you can use the oc command:

```bash
# In OpenShift
oc create job --from=cronjob/report-mailer-cronjob manual-report-job
```

You may need to delete the job first if it already exists.
