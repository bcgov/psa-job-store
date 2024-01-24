import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EmployeeGroupResolver } from './employee-group.resover';
import { EmployeeGroupService } from './employee-group.service';

@Module({
  imports: [PrismaModule],
  providers: [EmployeeGroupResolver, EmployeeGroupService],
})
export class EmployeeGroupModule {}
