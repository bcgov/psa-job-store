import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextCreateWithoutJob_profileInput {
  @Field(() => String, { nullable: false })
  description!: string;
}
