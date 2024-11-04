import { CacheModule } from '@nestjs/cache-manager';
import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { ExternalModule } from '../modules/external/external.module';
import { PositionService } from '../modules/external/position.service';
import { OrganizationModule } from '../modules/organization/organization.module';
import { PositionRequestModule } from '../modules/position-request/position-request.module';
import { PrismaService } from '../modules/prisma/prisma.service';
import { validateAppConfig } from '../utils/validate-app-config.util';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateAppConfig }),
    /*^^^ REQUIRED ^^^*/
    PositionRequestModule,
    ExternalModule,
    OrganizationModule,
  ],
  controllers: [],
})
class ScriptModule implements NestModule {
  configure() {}
}

interface PositionProfile {
  positionNumber?: string;

  positionDescription?: string;

  departmentName?: string;

  // ... other fields from the position you want to include

  //
  // employeeId: string;

  employeeName?: string;

  employeeEmail?: string;

  classification?: string;

  ministry?: string;

  status?: string;

  employeeId?: string;

  departmentId?: string;

  organizationId?: string;

  classificationId?: string;

  classificationCode?: string;

  classificationPeoplesoftId?: string;

  classificationEmployeeGroupId?: string;

  effectiveDate?: string;
}

async function runScript() {
  console.log('start script 3');
  const app = await NestFactory.createApplicationContext(ScriptModule);
  // Use the services from the app
  const positionService = app.get(PositionService);
  const prisma = app.get(PrismaService);
  try {
    const positionRequests = await prisma.positionRequest.findMany({});

    for (const pr of positionRequests) {
      console.log(pr.id + ' ' + pr.status);
      //
      const reportsTo = pr.reports_to_position as PositionProfile | null;
      if (reportsTo?.positionNumber) {
        const reportsToData = (await positionService.getPositionProfile(reportsTo?.positionNumber, true))[0];
        // await new Promise((resolve) => setTimeout(resolve, 500));
        reportsTo.employeeEmail = reportsToData?.employeeEmail;
      }

      const exclMgr = pr.excluded_manager_position as PositionProfile | null;
      if (exclMgr?.positionNumber) {
        const excludedMgrData = (await positionService.getPositionProfile(exclMgr?.positionNumber, true))[0];
        // await new Promise((resolve) => setTimeout(resolve, 500));
        exclMgr.employeeEmail = excludedMgrData?.employeeEmail;
      }

      // !additional_info.work_location_name
      //   ? console.log('no location name found for ' + additional_info?.work_location_id + ' ' + pr.department_id)
      //   : console.log(' new work_location_name: ' + JSON.stringify(additional_info?.work_location_name));
      await prisma.positionRequest.update({
        where: { id: pr.id },
        data: {
          reports_to_position: reportsTo ?? Prisma.DbNull,
          excluded_manager_position: exclMgr ?? Prisma.DbNull,
        },
      });
      console.log(' old EXCL:  ' + exclMgr?.employeeName);
      console.log(' new email:  ' + exclMgr?.employeeEmail);
      console.log(' old reportsTo: ' + reportsTo?.employeeName);
      console.log(' new email: ' + reportsTo?.employeeEmail);
    }

    console.log('Update successful');
  } catch (error) {
    console.error('Error running script', error);
  } finally {
    await app.close();
  }
}

runScript();
