import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationCount {
  @Field(() => Int, { nullable: false })
  departments?: number;

  @Field(() => Int, { nullable: false })
  positionRequests?: number;
}
