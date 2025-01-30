import { Prisma, PrismaClient } from '@prisma/client';
import { findManyAndCountExtension } from './extensions/find-many-with-count.extension';

const primaryExtension = {
  name: 'primary',
  client: {
    $primary() {
      return Prisma.getExtensionContext(this);
    },
  },
};

function extendClient(base: PrismaClient) {
  let client = base.$extends(primaryExtension).$extends(findManyAndCountExtension);

  return client;
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClientPgLite = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => ReturnType<typeof extendClient>;

export type ExtendedPrismaClientTypePgLite = ReturnType<typeof extendClient>;
export { ExtendedPrismaClientPgLite };
