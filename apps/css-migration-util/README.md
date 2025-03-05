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

## Technical Details

### Architecture

The CSS Migration Utility is built using NestJS and the nest-commander package to create a command-line interface. The application follows a modular architecture:

- **Main Module**: Entry point that bootstraps the command-line application
- **Command Module**: Contains the commands, services, and DTOs for the migration functionality
- **Migrate Command**: Implements the migration logic between CSS environments

### Command Options

The `migrate` command accepts the following options:

| Option                    | Description                                      | Required | Type   |
| ------------------------- | ------------------------------------------------ | -------- | ------ |
| `--client-id`             | Client ID for the CSS API                        | Yes      | String |
| `--client-secret`         | Client Secret for the CSS API                    | Yes      | String |
| `--source-environment`    | Environment to copy from (e.g., dev, test, prod) | Yes      | String |
| `--source-integration-id` | Integration ID to copy from                      | Yes      | Number |
| `--target-environment`    | Environment to copy to                           | Yes      | String |
| `--target-integration-id` | Integration ID to copy to                        | Yes      | Number |

### Migration Process

The utility performs the following steps during migration:

1. **Authentication**: Obtains an access token from the CSS API using the provided client credentials
2. **Role Retrieval**: Gets all roles from the source integration
3. **User Retrieval**: Gets all users and their associated roles from the source integration
4. **Role Creation**: Creates all roles in the target integration
5. **User Role Assignment**: Assigns roles to users in the target integration

### CSS API Integration

The utility interacts with the CSS API at `https://api.loginproxy.gov.bc.ca/api/v1` and uses the following endpoints:

- `/token` - For authentication
- `/integrations/{id}/{environment}/roles` - For role management
- `/integrations/{id}/{environment}/users/{username}/roles` - For user role assignment
- `/integrations/{id}/{environment}/roles/{role}/users` - For retrieving users with specific roles

### Dependencies

The utility relies on the following key dependencies:

- `@nestjs/axios` - For making HTTP requests to the CSS API
- `nest-commander` - For building the command-line interface
- `rxjs` - For reactive programming patterns
