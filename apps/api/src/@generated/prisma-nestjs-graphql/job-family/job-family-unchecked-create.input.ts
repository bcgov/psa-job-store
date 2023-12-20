import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutFamilyInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-family.input';

@InputType()
export class JobFamilyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutFamilyInput, { nullable: true })
  profiles?: JobProfileUncheckedCreateNestedManyWithoutFamilyInput;
}
