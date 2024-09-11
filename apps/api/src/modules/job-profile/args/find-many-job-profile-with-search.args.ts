import { ArgsType, Field, IntersectionType } from '@nestjs/graphql';
import { FindManyJobProfileArgs } from '../../../@generated/prisma-nestjs-graphql';
import { SearchArgs } from '../../../args/search.args';

@ArgsType()
export class FindManyJobProfileWithSearch extends IntersectionType(FindManyJobProfileArgs, SearchArgs) {
  @Field(() => Boolean, { nullable: true })
  sortByClassificationName?: boolean;

  @Field(() => Boolean, { nullable: true })
  sortByJobFamily?: boolean;

  @Field(() => Boolean, { nullable: true })
  sortByOrganization?: boolean;

  @Field(() => String, { nullable: true })
  sortOrder?: string;

  @Field(() => String, { nullable: true })
  selectProfile?: string;

  @Field(() => String, { nullable: true })
  departmentId?: string;
}
