import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToCreateManyInput } from './job-profile-reports-to-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileReportsToArgs {
  @Field(() => [JobProfileReportsToCreateManyInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyInput)
  data!: Array<JobProfileReportsToCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
