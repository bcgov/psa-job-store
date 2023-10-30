import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { Request } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { AppResolver } from './app.resolver';
import { AppConfigDto } from './dtos/app-config.dto';
import { RequestIdMiddleware } from './middleware/request-id.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { ClassificationModule } from './modules/classification/classification.module';
import { JobFamilyModule } from './modules/job-family/job-family.module';
import { JobProfileModule } from './modules/job-profile/job-profile.module';
import { JobRoleModule } from './modules/job-role/job-role.module';
import { MinistryModule } from './modules/ministry/ministry.module';
import { SeedModule } from './modules/seeds/seed.module';
import { validateAppConfig } from './utils/validate-app-config.util';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateAppConfig }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }) as { req: Request },
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService<AppConfigDto, true>) => {
        const NODE_ENV = config.get('NODE_ENV');

        return {
          pinoHttp: {
            genReqId: (req, res) => {
              const existingId = req.id ?? req.headers['x-request-id'];
              if (existingId) return existingId;

              const id = uuidv4();
              res.setHeader('X-Request-Id', id);
              return id;
            },
            level: NODE_ENV !== 'production' ? 'debug' : 'info',
            transport: NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
          },
        };
      },
    }),
    AuthModule,
    JobProfileModule,
    MinistryModule,
    ClassificationModule,
    JobFamilyModule,
    JobRoleModule,
    SeedModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, { provide: APP_GUARD, useClass: RoleGuard }, AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
