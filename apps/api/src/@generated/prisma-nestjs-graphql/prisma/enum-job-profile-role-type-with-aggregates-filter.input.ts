import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleType } from './job-profile-role-type.enum';
import { IntFilter } from './int-filter.input';
import { EnumJobProfileRoleTypeFilter } from './enum-job-profile-role-type-filter.input';

@InputType()
export class EnumJobProfileRoleTypeWithAggregatesFilter {
  @Field(() => JobProfileRoleType, { nullable: true })
  equals?: keyof typeof JobProfileRoleType;

  @Field(() => [JobProfileRoleType], { nullable: true })
  in?: Array<keyof typeof JobProfileRoleType>;

  @Field(() => [JobProfileRoleType], { nullable: true })
  notIn?: Array<keyof typeof JobProfileRoleType>;

  @Field(() => EnumJobProfileRoleTypeWithAggregatesFilter, { nullable: true })
  not?: EnumJobProfileRoleTypeWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumJobProfileRoleTypeFilter, { nullable: true })
  _min?: EnumJobProfileRoleTypeFilter;

  @Field(() => EnumJobProfileRoleTypeFilter, { nullable: true })
  _max?: EnumJobProfileRoleTypeFilter;
}
