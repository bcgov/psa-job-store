import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateManyInput } from './job-profile-job-family-link-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileJobFamilyLinkArgs {
  @Field(() => [JobProfileJobFamilyLinkCreateManyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
