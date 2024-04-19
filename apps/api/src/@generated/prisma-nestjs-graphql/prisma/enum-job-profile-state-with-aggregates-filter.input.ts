import { Field, InputType } from '@nestjs/graphql';
import { EnumJobProfileStateFilter } from './enum-job-profile-state-filter.input';
import { IntFilter } from './int-filter.input';
import { JobProfileState } from './job-profile-state.enum';

@InputType()
export class EnumJobProfileStateWithAggregatesFilter {
  @Field(() => JobProfileState, { nullable: true })
  equals?: keyof typeof JobProfileState;

  @Field(() => [JobProfileState], { nullable: true })
  in?: Array<keyof typeof JobProfileState>;

  @Field(() => [JobProfileState], { nullable: true })
  notIn?: Array<keyof typeof JobProfileState>;

  @Field(() => EnumJobProfileStateWithAggregatesFilter, { nullable: true })
  not?: EnumJobProfileStateWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  _min?: EnumJobProfileStateFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  _max?: EnumJobProfileStateFilter;
}
