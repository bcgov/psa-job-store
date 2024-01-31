import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyCount {
  @Field(() => Int, { nullable: false })
  jobProfiles?: number;

  @Field(() => Int, { nullable: false })
  JobProfileStream?: number;
}
