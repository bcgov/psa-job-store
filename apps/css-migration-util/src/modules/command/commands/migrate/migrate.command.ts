import { Command, CommandRunner, Option } from 'nest-commander';
import { MigrateCommandConfig } from '../../dtos/migrate-command.dtos';
import { CssApiService } from '../../services/css-api.service';

@Command({
  name: 'migrate',
})
export class MigrateCommand extends CommandRunner {
  constructor(private readonly cssApiService: CssApiService) {
    super();
  }

  @Option({
    flags: '--client-id <client-id>',
    description: 'Client ID for the request',
    required: true,
  })
  parseClientId(value: string) {
    return value;
  }

  @Option({
    flags: '--client-secret <client-secret>',
    description: 'Client Secret for the request',
    required: true,
  })
  parseClientSecret(value: string) {
    return value;
  }

  @Option({
    flags: '--source-environment <source-environment>',
    description: 'Environment to copy from',
    required: true,
  })
  parseSourceEnvironment(value: string) {
    return value;
  }

  @Option({
    flags: '--source-integration-id <source-integration-id>',
    description: 'Integration ID matching the client you want to copy from',
    required: true,
  })
  parseSourceIntegrationId(value: string) {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new Error('Source Integration ID must be a number');
    }

    return intValue;
  }

  @Option({
    flags: '--target-environment <target-environment>',
    description: 'Environment to copy to',
    required: true,
  })
  parseTargetEnvironment(value: string) {
    return value;
  }

  @Option({
    flags: '--target-integration-id <target-integration-id>',
    description: 'Integration ID matching the client you want to copy to',
    required: true,
  })
  parseTargetIntegrationId(value: string) {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new Error('Target Integration ID must be a number');
    }

    return intValue;
  }

  private getConfig(options: Record<string, any>): MigrateCommandConfig {
    return {
      client: {
        id: options.clientId,
        secret: options.clientSecret,
      },
      source: {
        environment: options.sourceEnvironment,
        id: options.sourceIntegrationId,
      },
      target: {
        environment: options.targetEnvironment,
        id: options.targetIntegrationId,
      },
    };
  }

  async run(passedParams: string[], options: Record<string, any>): Promise<void> {
    const config = this.getConfig(options);

    const roles = await this.cssApiService.getRoles(config.client, config.source);

    // Get users and associated roles from source
    const sourceUsers = await this.cssApiService.getUsersAndRoles(config.client, config.source, roles);

    // Migrate users to target integration
    await this.cssApiService.migrateRolesAndUsers(config.client, config.target, roles, sourceUsers);
  }
}
