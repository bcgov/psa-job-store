import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateManyInput } from './job-profile-reports-to-create-many.input';

@ArgsType()
export class CreateManyJobProfileReportsToArgs {
  @Field(() => [JobProfileReportsToCreateManyInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyInput)
  data!: Array<JobProfileReportsToCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
