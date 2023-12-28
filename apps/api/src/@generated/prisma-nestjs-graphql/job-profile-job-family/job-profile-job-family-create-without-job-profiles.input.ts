import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
