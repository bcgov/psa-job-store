import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SiteMinderGuidTestApiResolver } from './siteminder-guid-test.resolver';
import { SiteMinderGuidTestApiService } from './siteminder-guid-test.service';

@Module({
  imports: [HttpModule],
  providers: [SiteMinderGuidTestApiService, SiteMinderGuidTestApiResolver],
})
export class SiteMinderGuidTestApiModule {}
