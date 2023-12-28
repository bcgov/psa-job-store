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
  ) {
    (async () => {
      try {
        const indexExists = await elasticService.indices.exists({ index: 'job-profile' });
        if (indexExists === true) {
          await elasticService.indices.delete({ index: 'job-profile' });
        }
        await elasticService.indices.create({
          index: 'job-profile',
        });

        const jobProfiles = await prisma.jobProfile.findMany({
          include: {
            context: true,
          },
        });

        for await (const profile of jobProfiles) {
          await elasticService.index({
            index: 'job-profile',
            id: `${profile.id}`,
            document: {
              title: profile.title,
              context: profile.context?.description,
              overview: profile.overview,
              requirements: profile.requirements,
              accountabilities: profile.accountabilities,
              behavioural_competencies: (
                await prisma.jobProfileBehaviouralCompetency.findMany({
                  where: {
                    job_profile_id: profile.id,
                  },
                  select: {
                    behavioural_competency: {
                      select: {
                        name: true,
                        description: true,
                      },
                    },
                  },
                })
              ).map(({ behavioural_competency: { name, description } }) => `${name} ${description}`),
            },
          });
        }
      } catch (error) {
        console.error('ERROR: ', error);
      }
    })();
  }
}
