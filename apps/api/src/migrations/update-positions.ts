import { CacheModule } from '@nestjs/cache-manager';
import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExternalModule } from '../modules/external/external.module';
import { LocationService } from '../modules/external/location.service';
import { PositionService } from '../modules/external/position.service';
import { DepartmentService } from '../modules/organization/department/department.service';
import { OrganizationModule } from '../modules/organization/organization.module';
import { PositionRequestModule } from '../modules/position-request/position-request.module';
import { PrismaService } from '../modules/prisma/prisma.service';
import { validateAppConfig } from '../utils/validate-app-config.util';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true, validate: validateAppConfig }),
    /*^^^ REQUIRED TO*/
    PositionRequestModule,
    ExternalModule,
    OrganizationModule,
  ],
  controllers: [],
})
class ScriptModule implements NestModule {
  configure() {}
}

interface AdditionalInfo {
  work_location_id?: string;
  work_location_name?: string;
  department_id?: string;
  excluded_mgr_position_number?: string;
  branch?: string;
  division?: string;
}

async function runScript() {
  console.log('start script');
  const app = await NestFactory.createApplicationContext(ScriptModule);
  // Use the services from the app
  const positionService = app.get(PositionService);
  const locationService = app.get(LocationService);
  const departmentService = app.get(DepartmentService);
  const prisma = app.get(PrismaService);
  try {
    const positionRequests = await prisma.positionRequest.findMany({
      where: { status: { not: 'CANCELLED' } },
    });

    for (const pr of positionRequests) {
      let additional_info = pr.additional_info as AdditionalInfo | null;
      console.log(pr.id + ' ' + pr.status);
      //
      // console.log(' old additional_info: ' + JSON.stringify(additional_info));

      const reportsTo = (await positionService.getPositionProfile(pr.reports_to_position_id, true))[0];
      const excludedMgr = additional_info?.excluded_mgr_position_number
        ? (await positionService.getPositionProfile(additional_info?.excluded_mgr_position_number, true))[0]
        : undefined;
      if (additional_info?.work_location_id) {
        // console.log(' old work_location_name: ' + JSON.stringify(additional_info?.work_location_name));
        additional_info.work_location_name = (
          await locationService.getLocation({
            where: { id: additional_info?.work_location_id },
          })
        )?.name;
      } else if (pr.department_id) {
        //Initialize if necessary
        if (additional_info == null) additional_info = {};
        const dept = await departmentService.getDepartment({
          where: { id: pr.department_id },
        });
        additional_info.work_location_id = dept.location.id;
        additional_info.work_location_name = dept.location.name;
      }
      // !additional_info.work_location_name
      //   ? console.log('no location name found for ' + additional_info?.work_location_id + ' ' + pr.department_id)
      //   : console.log(' new work_location_name: ' + JSON.stringify(additional_info?.work_location_name));
      await prisma.positionRequest.update({
        where: { id: pr.id },
        data: {
          reports_to_position: reportsTo,
          excluded_manager_position: excludedMgr,
          additional_info: additional_info ?? undefined,
        },
      });

      // console.log(' old EXCL:  ' + additional_info?.excluded_mgr_position_number);
      // console.log(' new EXCL:  ' + excludedMgr?.positionNumber + ' ' + excludedMgr?.employeeName);
      // console.log(' old reportsTo: ' + pr.reports_to_position_id);
      // console.log(' new reportsTo: ' + reportsTo?.positionNumber + ' ' + reportsTo?.employeeName);
      // console.log(' new additional_info: ' + JSON.stringify(additional_info));
    }

    console.log('Update successful');
  } catch (error) {
    console.error('Error running script', error);
  } finally {
    await app.close();
  }
}

runScript();
