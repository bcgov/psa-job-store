import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {
    // (async () => {
    //   const csvFilePath = path.join(__dirname, '../../assets/positions.csv');
    //   const json = await csvToJson()
    //     .fromFile(csvFilePath, { encoding: 'utf-8' })
    //     .then((obj) => {
    //       return obj;
    //     });
    //   await this.ingestPositions(json);
    // })();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ingestPositions(json: Record<string, any>[]) {
    // const data = new Map();
    // json.forEach((j) => {
    //   data[j.department_id] = [j.organization_id, j.department_name];
    // });
    // const d = Object.entries(data).map(([k, [a, b]]) => ({ id: k, organization_id: a, name: b }));
    // d.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    // fs.writeFile('out.json', JSON.stringify(d), () => {
    //   console.log('complete');
    // });
    // for await (const j of json) {
    //   await this.prisma.position.upsert({
    //     where: {
    //       id: j.id,
    //     },
    //     create: {
    //       id: j.id,
    //       classification_id: j.classification_id,
    //       department_id: j.department_id,
    //       organization_id: j.organization_id,
    //       supervisor_id: j.supervisor_id,
    //       title: j.title,
    //       job_profile_number: j.job_profile_number,
    //       is_empty: isBoolean(j.is_empty) ? Boolean(j.is_empty) : true,
    //       is_vacant: isBoolean(j.is_vacant) ? Boolean(j.is_vacant) : true,
    //     },
    //     update: {
    //       classification_id: j.classification_id,
    //       department_id: j.department_id,
    //       organization_id: j.organization_id,
    //       supervisor_id: j.supervisor_id,
    //       title: j.title,
    //       job_profile_number: j.job_profile_number,
    //       is_empty: isBoolean(j.is_empty) ? Boolean(j.is_empty) : true,
    //       is_vacant: isBoolean(j.is_vacant) ? Boolean(j.is_vacant) : true,
    //     },
    //   });
    // }
  }

  // async getPositions(args?: FindManyPositionArgs) {
  //   return this.prisma.position.findMany({
  //     ...args,
  //     include: {
  //       classification: true,
  //       department: true,
  //       employees: true,
  //       organization: true,
  //     },
  //   });
  // }
}
