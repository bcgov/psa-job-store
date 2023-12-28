import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
