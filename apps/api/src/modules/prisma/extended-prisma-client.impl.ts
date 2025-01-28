import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import { findManyAndCountExtension } from './extensions/find-many-with-count.extension';

function extendClient(base: PrismaClient) {
  let client = base.$extends(findManyAndCountExtension);

  const replicaClient = new PrismaClient({
    datasourceUrl: process.env.DATABASE_READ_URL,
    // log: [{ level: 'query', emit: 'event' }],
  });

  return client.$extends(
    readReplicas({
      replicas: [replicaClient],
    }),
  );
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => ReturnType<typeof extendClient>;

export type ExtendedPrismaClientType = ReturnType<typeof extendClient>;
export { ExtendedPrismaClient };
