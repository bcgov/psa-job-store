import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobFamilyResolver } from './job-family.resolver';
import { JobFamilyService } from './job-family.service';

@Module({
  imports: [PrismaModule],
  providers: [JobFamilyResolver, JobFamilyService],
})
export class JobFamilyModule {}
