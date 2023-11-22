import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AppConfigDto } from '../../dtos/app-config.dto';
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
  ],
  providers: [SearchService],
  exports: [ElasticsearchModule, SearchService],
})
export class SearchModule {}
