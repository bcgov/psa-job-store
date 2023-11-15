import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { Employee } from '../employee/employee.model';
import { Position } from '../position/position.model';

@ObjectType()
export class Classification {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reportees?: Array<JobProfileReportsTo>;

  @Field(() => [Employee], { nullable: true })
  Employee?: Array<Employee>;

  @Field(() => [Position], { nullable: true })
  Position?: Array<Position>;
}
