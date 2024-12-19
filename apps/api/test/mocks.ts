import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(),
  Prisma: {
    defineExtension: jest.fn().mockImplementation((callback) => callback(mockDeep())),
  },
}));

jest.mock('common-kit', () => mockDeep<any>(), { virtual: true });
