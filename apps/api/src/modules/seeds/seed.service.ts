import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { applyClassificationSeeds } from './classification/classification.seeds';
import { applyGridSeeds } from './grid/grid.seeds';
import { applyMinistrySeeds } from './ministry/ministry.seeds';
import { applyOccupationGroupSeeds } from './occupation-group/occupation-group.seed';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}
  applySeeds = async () => {
    // eslint-disable-next-line no-console
    console.log('applying seeds..');

    await applyGridSeeds(this.prismaService);
    await applyOccupationGroupSeeds(this.prismaService);
    await applyClassificationSeeds(this.prismaService);
    await applyMinistrySeeds(this.prismaService);
  };

  seedsExist = async (prismaService: PrismaService) => {
    // check if seeds already exist by checking if there is any data in the user table
    const users = await prismaService.user.findMany({
      where: {
        deleted_at: null,
      },
    });
    return users.length !== 0;
  };
}
