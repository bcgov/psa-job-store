import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyInput } from './job-profile-job-family-link-create-many.input';

@ArgsType()
export class CreateManyJobProfileJobFamilyLinkArgs {
  @Field(() => [JobProfileJobFamilyLinkCreateManyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
