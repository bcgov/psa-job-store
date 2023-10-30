import { Query, Resolver } from '@nestjs/graphql';
import { Classification } from '../../@generated/prisma-nestjs-graphql';
import { ClassificationService } from './classification.service';

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  @Query(() => [Classification], { name: 'classifications' })
  getClassifications() {
    return this.classificationService.getClassifications();
  }
  @Query(() => [Classification], { name: 'resolvedClassifications' })
  async getResolvedClassifications() {
    const rawData = await this.classificationService.getResolvedClassifications();

    return rawData.map((item) => ({
      id: item.id,
      grid_name: item.grid?.name,
      occupation_group_name: item.occupation_group?.name,
    }));
  }
}
