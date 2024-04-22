import { Field, InputType } from '@nestjs/graphql';
import { JobProfileState } from './job-profile-state.enum';

@InputType()
export class EnumJobProfileStateFilter {
  @Field(() => JobProfileState, { nullable: true })
  equals?: keyof typeof JobProfileState;

  @Field(() => [JobProfileState], { nullable: true })
  in?: Array<keyof typeof JobProfileState>;

  @Field(() => [JobProfileState], { nullable: true })
  notIn?: Array<keyof typeof JobProfileState>;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  not?: EnumJobProfileStateFilter;
}
