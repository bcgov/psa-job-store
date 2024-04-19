import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamCreateManyJob_familyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;
}
