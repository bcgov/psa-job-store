export class MigrateCommandClientConfig {
  id!: string;
  secret!: string;
}

export class MigrateCommandIntegrationConfig {
  environment!: string;
  id!: number;
}

export class MigrateCommandConfig {
  client!: MigrateCommandClientConfig;
  source!: MigrateCommandIntegrationConfig;
  target!: MigrateCommandIntegrationConfig;
}
