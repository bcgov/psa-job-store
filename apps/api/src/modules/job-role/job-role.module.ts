import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobRoleResolver } from './job-role.resolver';
import { JobRoleService } from './job-role.service';

@Module({
  imports: [PrismaModule],
  providers: [JobRoleResolver, JobRoleService],
})
export class JobRoleModule {}
