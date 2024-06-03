import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { Classification, FindManyClassificationArgs } from '../../@generated/prisma-nestjs-graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ClassificationService } from './classification.service';

// @ObjectType()
// class ClassificationItem {
//   @Field()
//   id: string;

//   @Field()
//   name: string;
// }

// @ObjectType()
// class GroupedClassification {
//   @Field()
//   groupName: string;

//   @Field(() => [ClassificationItem], { nullable: true })
//   items?: ClassificationItem[];

//   @Field(() => [GroupedClassification], { nullable: 'itemsAndList' })
//   children?: GroupedClassification[];
// }

@ObjectType()
class ClassificationItem {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  employee_group_id?: string;

  @Field({ nullable: true })
  peoplesoft_id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  groupName?: string;

  @Field(() => [ClassificationItem], { nullable: true })
  items?: ClassificationItem[];
}

@ObjectType()
class GroupedClassification {
  @Field({ nullable: true })
  groupName?: string;

  @Field({ nullable: true })
  id?: string;

  @Field(() => [ClassificationItem], { nullable: true })
  items?: ClassificationItem[];
}

@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) {}

  @Query(() => [Classification], { name: 'classifications' })
  getClassifications(@CurrentUser() user: Express.User, @Args() args?: FindManyClassificationArgs) {
    return this.classificationService.getClassifications(args);
  }

  @Query(() => [GroupedClassification], { name: 'groupedClassifications' })
  async getGroupedClassifications(
    @CurrentUser() user: Express.User,
    @Args() args?: FindManyClassificationArgs,
  ): Promise<GroupedClassification[]> {
    // Overview
    // The Grouped Classifications algorithm is designed to process and organize a set of classification data into a structured,
    //  hierarchical tree format.

    // Process Flow

    // Fetching Data:

    // The process begins with fetching classification data using Prisma's query capabilities.
    // It filters data based on specific criteria such as effective_status and peoplesoft_id.

    // Grouping Classifications:

    // The fetched data is then iteratively processed to form a grouped structure.
    // Each classification name is split into parts, and a nested object structure is created where each part of the
    // name corresponds to a level in the hierarchy.

    // Building Tree Structure:

    // The grouped data is converted into a nested array format, representing the tree structure.
    // This is achieved through the convertToNestedArray method, which recursively builds the tree.

    // Unwrapping Single Child Groups:

    // In cases where a group in the tree only has one child, it is "unwrapped" to simplify the structure.
    // This unwrapping is performed by the unwrapSingleChildGroups function, which recursively ensures that all
    // unnecessary single-child layers are removed.

    // Simplifying the Structure:

    // Finally, the simplifyStructure function is used to further streamline the tree.
    // It merges 'children' into 'items' and handles cases where a node only contains a single item.

    return this.classificationService.getGroupedClassifications(args);
  }
}
