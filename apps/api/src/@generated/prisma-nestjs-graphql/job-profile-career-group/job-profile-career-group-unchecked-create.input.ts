import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutCareer_groupInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-career-group.input';

@InputType()
export class JobProfileCareerGroupUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutCareer_groupInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutCareer_groupInput;
}
