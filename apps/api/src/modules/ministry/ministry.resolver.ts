import { Query, Resolver } from '@nestjs/graphql';
import { Ministry } from '../../@generated/prisma-nestjs-graphql';
import { MinistryService } from './ministry.service';

@Resolver(() => Ministry)
export class MinistryResolver {
  constructor(private readonly ministryService: MinistryService) {}

  @Query(() => [Ministry], { name: 'ministries' })
  getMinistries() {
    return this.ministryService.getMinistries();
  }

  // @Query(() => MinistryModel, { name: 'ministry' })
  // getMinistry(@Args({ name: 'id', type: () => GraphQLUUID }) id: string) {
  //   return this.ministryService.getMinistry(id);
  // }
}
