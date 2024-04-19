import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateManyInput } from './job-profile-job-family-create-many.input';

@ArgsType()
export class CreateManyJobProfileJobFamilyArgs {
  @Field(() => [JobProfileJobFamilyCreateManyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyCreateManyInput)
  data!: Array<JobProfileJobFamilyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
