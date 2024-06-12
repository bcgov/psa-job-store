import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { AppResolver } from './app.resolver';
import { RequestIdMiddleware } from './middleware/request-id.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RolesGlobalGuard } from './modules/auth/guards/role-global.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { BehaviouralComptencyModule } from './modules/behavioral-comptency/behavioural-comptency.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { CommentModule } from './modules/comment/comment.module';
import { EmployeeGroupModule } from './modules/employee-group/employee-group.module';
import { ExternalModule } from './modules/external/external.module';
import { JobFamilyModule } from './modules/job-family/job-family.module';
import { JobProfileMinimumRequirementsModule } from './modules/job-profile-minimum-requirements/job-profile-minimum-requirements.module';
import { JobProfileScopeModule } from './modules/job-profile-scope/job-profile-scope.module';
import { JobProfileStreamModule } from './modules/job-profile-stream/job-profile-stream.module';
import { JobProfileModule } from './modules/job-profile/job-profile.module';
import { JobRoleModule } from './modules/job-role/job-role.module';
import { PositionRequestModule } from './modules/position-request/position-request.module';
import { SavedJobProfileModule } from './modules/saved-job-profile/saved-job-profile.module';
import { ScheduledTaskModule } from './modules/scheduled-task/scheduled-task.module';
import { SearchModule } from './modules/search/search.module';
import { apolloPinoLoggingPlugin } from './utils/logging/apolloPinoLoggingPlugin';
import { formatGraphQLError } from './utils/logging/graphql-error.formatter';
import { loggerOptions } from './utils/logging/logger.factory';
import { validateAppConfig } from './utils/validate-app-config.util';

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

    ScheduleModule.forRoot(),
    AuthModule,
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
    // AppLogModule,
    ScheduledTaskModule,
    SavedJobProfileModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGlobalGuard,
    },
    { provide: APP_GUARD, useClass: RoleGuard },
    AppResolver,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
