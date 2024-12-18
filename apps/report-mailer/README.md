## Running the mailer

The mailer is script that is meant to be run by a cron job.

If you would like to run it locally, you can simply run

```bash
npm run start
```

Otherwise if you want to execute a job on demand, you can use the oc command:

```bash
oc create job --from=cronjob/my-email-cronjob manual-email-job
```

You may need to delete the job first if it already exists.

The job executes SQL queries against the database. Those queries are defined in a configmap object in openshift called sql-queries.configmap.yml.

You can edit the config map directly to change the queries being run. The keys are the file names, and should end in .sql. The values should be valid SQL.
