import { Field, InputType } from '@nestjs/graphql';
import { JobProfileType } from './job-profile-type.enum';

@InputType()
export class EnumJobProfileTypeFilter {
  @Field(() => JobProfileType, { nullable: true })
  equals?: keyof typeof JobProfileType;

  @Field(() => [JobProfileType], { nullable: true })
  in?: Array<keyof typeof JobProfileType>;

  @Field(() => [JobProfileType], { nullable: true })
  notIn?: Array<keyof typeof JobProfileType>;

  @Field(() => EnumJobProfileTypeFilter, { nullable: true })
  not?: EnumJobProfileTypeFilter;
}
