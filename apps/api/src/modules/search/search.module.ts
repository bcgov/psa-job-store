import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { JobProfileState } from '@prisma/client';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SearchIndex, SearchService } from './search.service';

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
      try {
        const indexExists = await elasticService.indices.exists({ index: SearchIndex.JobProfile });
        if (indexExists === true) {
          await elasticService.indices.delete({ index: SearchIndex.JobProfile });
        }
        await elasticService.indices.create({
          index: SearchIndex.JobProfile,
        });

        const jobProfiles = await prisma.jobProfile.findMany({
          select: { id: true },
          where: { state: { equals: JobProfileState.PUBLISHED } },
        });

        for await (const profile of jobProfiles) {
          await this.searchService.updateJobProfileSearchIndex(profile.id);
        }
      } catch (error) {
        console.error('ERROR: ', error);
      }
    })();
  }
}
