import { Ministry } from '../../../@generated/prisma-nestjs-graphql';

import { PrismaService } from '../../prisma/prisma.service';
import { SeedType } from '../seed.type';
import { applySeeds } from '../util/util';

export const ministrySeeds: SeedType<Ministry> = {
  upsert: [
    { id: 1, name: 'Agriculture and Food', code: 'AGR' },
    { id: 2, name: 'Attorney General', code: 'AG' },
    { id: 3, name: 'BC Financial Services Authority', code: 'FSA' },
    { id: 4, name: 'BC Pension Corp', code: 'BCPC' },
    { id: 5, name: 'BC Public Service Agency', code: 'PSA' },
    // { id: '1', name: 'BC Rep for Children & Youth' },
    // { id: '1', name: 'Children & Family Development' },
    // { id: '1', name: "Citizens' Services" },
    // { id: '1', name: "Conflict of Interest Commiss'r" },
    // { id: '1', name: 'Destination BC Corp' },
    // { id: '1', name: 'Education and Child Care' },
    // { id: '1', name: 'Elections BC' },
    // { id: '1', name: 'Emerg Mgt, Climate Readiness (EMCR)' },
    // { id: '1', name: 'Energy, Mines & Low Carb Inn' },
    // { id: '1', name: 'Env & Climate Change Strategy' },
    // { id: '1', name: 'Env Assessment Office' },
    // { id: '1', name: 'Forest Practices Board' },
    // {
    //   id: '1',

    //   name: 'Government Communication and Public Engagement',
    // },
    // { id: '1', name: 'Health' },
    // { id: '1', name: 'Indigenous Relations & Recon' },
    // { id: '1', name: 'Islands Trust' },
    // { id: '1', name: 'Jobs, Econom Dev & Innovation' },
    // { id: '1', name: 'Liquor Distribution Branch' },
    // { id: '1', name: 'Mental Health & Addictions' },
    // { id: '1', name: 'Min of Trans & Infrastructure' },
    // { id: '1', name: 'Ministry of Finance' },
    // { id: '1', name: 'Ministry of Forests' },
    // { id: '1', name: 'Ministry of Housing' },
    // { id: '1', name: 'Ministry of Labour' },
    // { id: '1', name: 'Municipal Affairs' },
    // { id: '1', name: 'Off of the Merit Commissioner' },
    // { id: '1', name: 'Off of the Police Complaint Co' },
    // { id: '1', name: 'Office of Info & Priv Comm' },
    // { id: '1', name: 'Office of the Auditor General' },
    // {
    //   id: '1',

    //   name: 'Office of the Human Rights Commissioner for British Columbia',
    // },
    // { id: '1', name: 'Office of the Ombudsperson' },
    // { id: '1', name: 'Office of the Premier' },
    // { id: '1', name: 'Other Public Sector' },
    // { id: '1', name: 'Post-Sec Ed & Future Skills' },
    // { id: '1', name: 'Product Services' },
    // { id: '1', name: 'Public Guardian and Trustee' },
    // { id: '1', name: 'Public Safety & Sol General' },
    // { id: '1', name: 'Royal BC Museum' },
    // { id: '1', name: 'Social Dev & Poverty Reduction' },
    // { id: '1', name: 'Teachers Act Special Account' },
    // { id: '1', name: 'Tourism, Arts, Culture & Sport' },
    // { id: '1', name: 'Water, Land, Resource Stewardship' },
  ],
  remove: [],
};

export const applyMinistrySeeds = async (prismaService: PrismaService) => {
  await applySeeds(ministrySeeds, prismaService, 'ministry');
};
