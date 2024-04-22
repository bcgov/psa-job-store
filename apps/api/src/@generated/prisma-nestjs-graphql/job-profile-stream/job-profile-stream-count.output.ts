import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamCount {
  @Field(() => Int, { nullable: false })
  jobProfiles?: number;
}
