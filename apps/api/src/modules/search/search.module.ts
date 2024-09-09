import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AppConfigDto, true>) => ({
        node: configService.get('ELASTIC_NODE'),
        auth: {
          username: configService.get('ELASTIC_USERNAME'),
          password: configService.get('ELASTIC_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [SearchService],
  exports: [ElasticsearchModule, SearchService],
})
export class SearchModule {
  constructor(
    private readonly elasticService: ElasticsearchService,
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {
    (async () => {
      await searchService.resetIndex();
    })();
  }
}
