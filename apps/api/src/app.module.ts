import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { RequestIdMiddleware } from './middleware/request-id.middleware';
import { AppLogModule } from './modules/app-log/app-log.module';
import { BehaviouralComptencyModule } from './modules/behavioral-comptency/behavioural-comptency.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { CommentModule } from './modules/comment/comment.module';
import { EmployeeGroupModule } from './modules/employee-group/employee-group.module';
import { ExternalModule } from './modules/external/external.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { JobFamilyModule } from './modules/job-family/job-family.module';
import { JobProfileMinimumRequirementsModule } from './modules/job-profile-minimum-requirements/job-profile-minimum-requirements.module';
import { JobProfileScopeModule } from './modules/job-profile-scope/job-profile-scope.module';
import { JobProfileStreamModule } from './modules/job-profile-stream/job-profile-stream.module';
import { JobProfileModule } from './modules/job-profile/job-profile.module';
import { JobRoleModule } from './modules/job-role/job-role.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PositionRequestModule } from './modules/position-request/position-request.module';
import { SavedJobProfileModule } from './modules/saved-job-profile/saved-job-profile.module';
import { SearchModule } from './modules/search/search.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/utils/event.module';
import { apolloPinoLoggingPlugin } from './utils/logging/apolloPinoLoggingPlugin';
import { formatGraphQLError } from './utils/logging/graphql-error.formatter';
import { loggerOptions } from './utils/logging/logger.factory';
import { validateAppConfig } from './utils/validate-app-config.util';
// AL-1020
// import { E2EAuthModule } from './modules/auth/e2e-auth.module';
import { OrGuard } from '@nest-lab/or-guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { PublicRouteBypassGuard } from './modules/auth/guards/public-route-bypass.guard';
import { SessionAuthGuard } from './modules/auth/guards/session-auth.guard';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateAppConfig }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [apolloPinoLoggingPlugin],
      context: ({ req }) => ({ req }) as { req: Request },
      formatError: process.env.NODE_ENV == 'development' ? null : formatGraphQLError,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        pinoHttp: loggerOptions,
      }),
    }),
    EventModule,
    HealthCheckModule,
    ScheduleModule.forRoot(),
    PositionRequestModule,
    JobProfileModule,
    ClassificationModule,
    CommentModule,
    JobFamilyModule,
    JobRoleModule,
    BehaviouralComptencyModule,
    ExternalModule,
    SearchModule,
    EmployeeGroupModule,
    JobProfileStreamModule,
    JobProfileScopeModule,
    JobProfileMinimumRequirementsModule,
    AppLogModule,
    SavedJobProfileModule,
    UserModule,
    KeycloakModule,
    SettingsModule,
    OrganizationModule,
    AuthModule,
    // ScheduledTaskModule,
    // E2EAuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: OrGuard([PublicRouteBypassGuard, SessionAuthGuard]),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
