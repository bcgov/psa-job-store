import { Resolver } from '@nestjs/graphql';
import { Classification } from '../../@generated/prisma-nestjs-graphql';

@Resolver(() => Classification)
export class ClassificationResolver {
  // constructor(private readonly classificationService: ClassificationService) {}
  // @Query(() => [Classification], { name: 'classifications' })
  // getClassifications() {
  //   return this.classificationService.getClassifications();
  // }
  // @ResolveField(() => Grid)
  // async grid(@Parent() { grid_id }: Classification) {
  //   return this.classificationService.getGrid(grid_id);
  // }
  // @ResolveField(() => OccupationGroup)
  // async occupation_group(@Parent() { occupation_group_id }: Classification) {
  //   return this.classificationService.getOccupationGroup(occupation_group_id);
  // }
}
