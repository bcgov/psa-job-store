import { Query, Resolver } from '@nestjs/graphql';
import { Classification } from '../../@generated/prisma-nestjs-graphql';
import { ClassificationService } from './classification.service';

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  @Query(() => [Classification], { name: 'classifications' })
  getJobFamilies() {
    return this.classificationService.getClassifications();
  }
}
