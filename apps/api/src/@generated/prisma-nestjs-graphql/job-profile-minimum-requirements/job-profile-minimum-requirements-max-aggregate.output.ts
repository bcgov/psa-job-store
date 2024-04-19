import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileMinimumRequirementsMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  requirement?: string;

  @Field(() => String, { nullable: true })
  grade?: string;
}
