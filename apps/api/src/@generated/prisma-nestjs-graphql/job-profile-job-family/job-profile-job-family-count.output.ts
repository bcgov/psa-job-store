import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyCount {
  @Field(() => Int, { nullable: false })
  jobProfiles?: number;

  @Field(() => Int, { nullable: false })
  JobProfileStream?: number;
}
