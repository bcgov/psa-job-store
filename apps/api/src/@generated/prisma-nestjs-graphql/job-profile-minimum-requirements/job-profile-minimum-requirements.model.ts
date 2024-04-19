import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileMinimumRequirements {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  requirement!: string;

  @Field(() => String, { nullable: false })
  grade!: string;
}
