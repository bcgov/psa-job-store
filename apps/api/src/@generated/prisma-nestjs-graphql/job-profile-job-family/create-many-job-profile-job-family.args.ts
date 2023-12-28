import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateManyInput } from './job-profile-job-family-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileJobFamilyArgs {
  @Field(() => [JobProfileJobFamilyCreateManyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyCreateManyInput)
  data!: Array<JobProfileJobFamilyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
