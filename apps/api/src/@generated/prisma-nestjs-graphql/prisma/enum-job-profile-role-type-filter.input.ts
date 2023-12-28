import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleType } from './job-profile-role-type.enum';

@InputType()
export class EnumJobProfileRoleTypeFilter {
  @Field(() => JobProfileRoleType, { nullable: true })
  equals?: keyof typeof JobProfileRoleType;

  @Field(() => [JobProfileRoleType], { nullable: true })
  in?: Array<keyof typeof JobProfileRoleType>;

  @Field(() => [JobProfileRoleType], { nullable: true })
  notIn?: Array<keyof typeof JobProfileRoleType>;

  @Field(() => EnumJobProfileRoleTypeFilter, { nullable: true })
  not?: EnumJobProfileRoleTypeFilter;
}
