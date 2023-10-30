/* eslint-disable max-classes-per-file */
import { Grid } from '../../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { SeedType } from '../seed.type';
import { applySeeds } from '../util/util';

export const gridSeeds: SeedType<Grid> = {
  upsert: [
    {
      id: 1,
      name: '9',
      steps: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      name: '12',
      steps: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      name: '15',
      steps: [1, 2, 3, 4, 5],
    },
  ],
  remove: [],
};

export const applyGridSeeds = async (prismaService: PrismaService) => {
  await applySeeds(gridSeeds, prismaService, 'grid');
};
