import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutCareer_groupInput } from '../job-profile/job-profile-create-nested-many-without-career-group.input';

@InputType()
export class CareerGroupCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutCareer_groupInput, { nullable: true })
  profiles?: JobProfileCreateNestedManyWithoutCareer_groupInput;
}
