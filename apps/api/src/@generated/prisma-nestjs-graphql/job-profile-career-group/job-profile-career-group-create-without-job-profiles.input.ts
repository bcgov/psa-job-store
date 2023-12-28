import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCareerGroupCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
