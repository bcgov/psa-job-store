import { Injectable } from '@nestjs/common';
import { isBoolean } from 'class-validator';
import csvToJson from 'csvtojson';
import path from 'path';
import { FindManyPositionArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {
    (async () => {
      const csvFilePath = path.join(__dirname, '../../assets/positions.csv');

      const json = await csvToJson()
        .fromFile(csvFilePath, { encoding: 'utf-8' })
        .then((obj) => {
          return obj;
        });

      await this.ingestPositions(json);
    })();
  }

  async ingestPositions(json: Record<string, any>[]) {
    for await (const j of json) {
      await this.prisma.classification.upsert({
        where: { id: j.classification_id },
        create: {
          id: j.classification_id,
          code: j.classification_code,
        },
        update: {
          code: j.classification_code,
        },
      });

      await this.prisma.organization.upsert({
        where: {
          id: j.organization_id,
        },
        create: {
          id: j.organization_id,
          name: j.organization_name,
        },
        update: {
          name: j.organization_name,
        },
      });

      await this.prisma.department.upsert({
        where: {
          id: j.department_id,
        },
        create: {
          id: j.department_id,
          organization_id: j.organization_id,
          name: j.department_name,
        },
        update: {
          organization_id: j.organization_id,
          name: j.department_name,
        },
      });

      await this.prisma.position.upsert({
        where: {
          id: j.id,
        },
        create: {
          id: j.id,
          classification_id: j.classification_id,
          department_id: j.department_id,
          organization_id: j.organization_id,
          supervisor_id: j.supervisor_id,
          title: j.title,
          job_profile_number: j.job_profile_number,
          is_empty: isBoolean(j.is_empty) ? Boolean(j.is_empty) : true,
          is_vacant: isBoolean(j.is_vacant) ? Boolean(j.is_vacant) : true,
        },
        update: {
          classification_id: j.classification_id,
          department_id: j.department_id,
          organization_id: j.organization_id,
          supervisor_id: j.supervisor_id,
          title: j.title,
          job_profile_number: j.job_profile_number,
          is_empty: isBoolean(j.is_empty) ? Boolean(j.is_empty) : true,
          is_vacant: isBoolean(j.is_vacant) ? Boolean(j.is_vacant) : true,
        },
      });
    }
  }

  async getPositions(args?: FindManyPositionArgs) {
    return this.prisma.position.findMany({
      ...args,
      include: {
        classification: true,
        department: true,
        employees: true,
        organization: true,
      },
    });
  }
}
