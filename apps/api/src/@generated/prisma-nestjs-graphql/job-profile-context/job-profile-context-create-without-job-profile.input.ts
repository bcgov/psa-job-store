import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextCreateWithoutJob_profileInput {
  @Field(() => String, { nullable: false })
  description!: string;
}
