# Job Store CSS Migration Utility

This tool is used to migrate roles and users between two Keycloak integrations: source and target. It is meant as a 1-way transfer of data at a point in time. The target is expected to be empty (contains no roles), and no cleanup is performed if that is not the case.

## Running the utility

If you haven't previously built the utility, open a command prompt and type `npm -w css-migration-util build`.

Use the following command to migrate users between integrations

> Note: client-id and client-secret are found at CSS -> My Teams -> <team name> -> CSS API Account

```sh
node ./apps/css-migration-util/dist/main.js migrate \n
    --client-id=<client-id> \n
    --client-secret=<client-secret> \n
    --source-environment=<source-environment> \n
    --source-integration-id=<source-integration-id> \n
    --target-environment=<target-environment> \n
    --target-integration-id=<target-integration-id> \n
```

## Development

While making modifications to the `css-migration-util`, open two command prompts. In the first, run `npm -w css-migration-util start:dev` to recompile on changes, and in the second run the command in the section above to test individual commands.
