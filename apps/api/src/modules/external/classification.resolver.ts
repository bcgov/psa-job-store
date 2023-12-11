import { Args, Query, Resolver } from '@nestjs/graphql';
import { Classification, FindManyClassificationArgs } from '../../@generated/prisma-nestjs-graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ClassificationService } from './classification.service';

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  @Query(() => [Classification], { name: 'classifications' })
  getClassifications(@CurrentUser() user: Express.User, @Args() args?: FindManyClassificationArgs) {
    return this.classificationService.getClassifications(args);
  }
}
