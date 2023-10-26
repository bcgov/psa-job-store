import { OccupationGroup } from '../../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { SeedType } from '../seed.type';
import { applySeeds } from '../util/util';

export const occupationGroupSeeds: SeedType<OccupationGroup> = {
  upsert: [
    { id: 1, code: 'CLK', name: 'Clerk' },
    // { id: 'dc56bc3a-32c6-48ae-9771-81344329640b', code: 'BAND', name: 'Band' },
    // { id: 'a54de04d-620a-40e3-b57a-a28aab04566d', code: 'IS', name: 'Information Systems' },
  ],
  remove: [],
};

export const applyOccupationGroupSeeds = async (prismaService: PrismaService) => {
  await applySeeds(occupationGroupSeeds, prismaService, 'occupationGroup');
};
