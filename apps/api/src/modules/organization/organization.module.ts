import { Module, forwardRef } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { LocationService } from '../external/location.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DepartmentResolver } from './department/department.resolver';
import { DepartmentService } from './department/department.service';
import { OrganizationResolver } from './organization/organization.resolver';
import { OrganizationService } from './organization/organization.service';

@Module({
  imports: [forwardRef(() => ExternalModule), PrismaModule],
  providers: [DepartmentResolver, DepartmentService, LocationService, OrganizationResolver, OrganizationService],
})
export class OrganizationModule {}
