import { PrismaClient } from '@prisma/client';
import { seed } from '../src/utils/e2e-test-data-seed';
const prisma = new PrismaClient();

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
