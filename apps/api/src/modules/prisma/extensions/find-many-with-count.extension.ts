import { Prisma } from '@prisma/client';

type FindManyAndCountResult<T = any> = [data: T, page: number, pageCount: number, pageSize: number, totalCount: number];

export const findManyAndCountExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'findManyAndCount',
    model: {
      $allModels: {
        /**
         * Find and return items and total available count
         */
        async findManyAndCount<TModel, TArgs extends Prisma.Args<TModel, 'findMany'>>(
          this: TModel,
          args?: Prisma.Exact<TArgs, Prisma.Args<TModel, 'findMany'>>,
        ): Promise<FindManyAndCountResult<Prisma.Result<TModel, TArgs, 'findMany'>>> {
          const context = Prisma.getExtensionContext(this);

          const [records, totalRecords] = await client.$transaction([
            (context as any).findMany(args),
            (context as any).count({ where: (args as any)?.where }),
          ]);

          const skip = (args as any)?.skip;
          const pageSize = (args as any)?.take;

          const page = skip / pageSize + 1;

          let pageCount = totalRecords === 0 ? 0 : 1;

          if (pageSize === 0) {
            pageCount = 0;
          } else if (typeof pageSize === 'number') {
            pageCount = Math.ceil(totalRecords / pageSize);
          }

          return [records, page, pageCount, pageSize, totalRecords];
        },
      },
    },
  });
});
