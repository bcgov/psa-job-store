import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@InputType()
export class JobProfileJobFamilyLinkListRelationFilter {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  every?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  some?: JobProfileJobFamilyLinkWhereInput;

  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  none?: JobProfileJobFamilyLinkWhereInput;
}
