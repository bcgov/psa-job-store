import { Field, InputType } from '@nestjs/graphql';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';

@InputType()
export class JobProfileReportsToListRelationFilter {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  every?: JobProfileReportsToWhereInput;

  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  some?: JobProfileReportsToWhereInput;

  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  none?: JobProfileReportsToWhereInput;
}
