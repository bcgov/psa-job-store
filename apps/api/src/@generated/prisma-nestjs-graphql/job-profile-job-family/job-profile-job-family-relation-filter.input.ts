import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@InputType()
export class JobProfileJobFamilyRelationFilter {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  is?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  isNot?: JobProfileJobFamilyWhereInput;
}
