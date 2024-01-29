import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobProfileScopeResolver } from './job-profile-scope.resover';
import { JobProfileScopeService } from './job-profile-scope.service';

@Module({
  imports: [PrismaModule],
  providers: [JobProfileScopeResolver, JobProfileScopeService],
})
export class JobProfileScopeModule {}
