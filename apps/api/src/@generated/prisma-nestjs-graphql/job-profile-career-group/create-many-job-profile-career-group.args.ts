import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupCreateManyInput } from './job-profile-career-group-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileCareerGroupArgs {
  @Field(() => [JobProfileCareerGroupCreateManyInput], { nullable: false })
  @Type(() => JobProfileCareerGroupCreateManyInput)
  data!: Array<JobProfileCareerGroupCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
