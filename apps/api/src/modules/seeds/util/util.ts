import { PrismaService } from '../../prisma/prisma.service';

export async function applySeeds<T extends { id: string | number }>(
  seeds: { upsert: T[]; remove: T[] },
  prismaService: PrismaService,
  modelName: string, // Pass the model name as an argument
  // validateInput: any,
  // validateObject: typeof defaultValidator.validateObject = defaultValidator.validateObject,
) {
  const { upsert, remove } = seeds;

  for await (const seed of upsert) {
    // validateObject(seed, validateInput);
    const { id, ...data } = seed;
    // Check if the seeds exist
    const existingData = await prismaService[modelName].findUnique({
      where: { id },
    });
    if (!existingData) {
      // Data doesn't exist -- create it
      await prismaService[modelName].create({
        data,
      });
    } else {
      // Data exists -- update it
      await prismaService[modelName].update({
        where: { id },
        data,
      });
    }
  }

  for await (const seed of remove) {
    await prismaService[modelName].delete({
      where: { id: seed.id },
      data: seed,
    });
  }
}
