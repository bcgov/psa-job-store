import { Classification } from '../../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { SeedType } from '../seed.type';
import { applySeeds } from '../util/util';

export const classificationSeeds: SeedType<Classification> = {
  upsert: [
    // CLK 9, 12, 15
    {
      id: 1,
      grid_id: 1,
      occupation_group_id: 1,
    },
    {
      id: 2,
      grid_id: 2,
      occupation_group_id: 1,
    },
    {
      id: 3,
      grid_id: 3,
      occupation_group_id: 1,
    },
    // IS 18, 21, 24, 27, 30
    // {
    //   id: '7e2a2c26-7a77-4dbe-8d9c-eafa37ebbeb7',
    //   grid_id: '7a22c548-26a9-4bf3-96d1-b8b0bda28eab',
    //   occupation_group_id: 'a54de04d-620a-40e3-b57a-a28aab04566d',
    // },
    // {
    //   id: 'a07800b6-db39-4bc1-94f6-996c7d05e938',
    //   grid_id: '97203bf7-46f4-4b8d-9cd9-a0a0b8bb9560',
    //   occupation_group_id: 'a54de04d-620a-40e3-b57a-a28aab04566d',
    // },
    // {
    //   id: '8c771981-8e49-401d-887d-542dcc64451c',
    //   grid_id: '6dd3345c-00b1-410e-b584-11315af2b3db',
    //   occupation_group_id: 'a54de04d-620a-40e3-b57a-a28aab04566d',
    // },
    // {
    //   id: '343fb017-e759-4e43-9438-6c0576600a7a',
    //   grid_id: '6410100c-2c34-4f0e-baad-ed9de5299dd8',
    //   occupation_group_id: 'a54de04d-620a-40e3-b57a-a28aab04566d',
    // },
    // {
    //   id: '28bf5d98-d737-485c-b1bd-00a84900e8fe',
    //   grid_id: '851f9d71-fc20-4055-becd-41ecf50d6750',
    //   occupation_group_id: 'a54de04d-620a-40e3-b57a-a28aab04566d',
    // },
  ],
  remove: [],
};

export const applyClassificationSeeds = async (prismaService: PrismaService) => {
  await applySeeds(classificationSeeds, prismaService, 'classification');
};
