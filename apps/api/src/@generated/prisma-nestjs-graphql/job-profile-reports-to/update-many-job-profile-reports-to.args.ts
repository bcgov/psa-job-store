import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToUncheckedUpdateManyInput } from './job-profile-reports-to-unchecked-update-many.input';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';

@ArgsType()
export class UpdateManyJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileReportsToUncheckedUpdateManyInput)
  data!: JobProfileReportsToUncheckedUpdateManyInput;

  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;
}
