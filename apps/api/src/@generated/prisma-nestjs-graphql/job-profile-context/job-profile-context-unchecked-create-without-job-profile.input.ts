import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUncheckedCreateWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  description!: string;
}
