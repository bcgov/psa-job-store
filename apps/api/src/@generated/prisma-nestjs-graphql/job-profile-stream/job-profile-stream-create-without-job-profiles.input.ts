import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
