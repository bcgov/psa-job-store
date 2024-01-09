import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { JobProfileClassification } from '../job-profile-classification/job-profile-classification.model';
import { JobProfileOrganization } from '../job-profile-organization/job-profile-organization.model';
import { JobProfileCareerGroup } from '../job-profile-career-group/job-profile-career-group.model';
import { JobProfileContext } from '../job-profile-context/job-profile-context.model';
import { JobProfileJobFamily } from '../job-profile-job-family/job-profile-job-family.model';
import { JobProfileRole } from '../job-profile-role/job-profile-role.model';
import { JobProfileStream } from '../job-profile-stream/job-profile-stream.model';
import { User } from '../user/user.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { PositionRequest } from '../position-request/position-request.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  career_group_id!: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => JobProfileState, { nullable: false, defaultValue: 'DRAFT' })
  state!: keyof typeof JobProfileState;

  @Field(() => Int, { nullable: false })
  stream_id!: number;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => Date, { nullable: true })
  updated_at!: Date | null;

  @Field(() => String, { nullable: true })
  owner_id!: string | null;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: false, defaultValue: '{"optional": [], "required": []}' })
  accountabilities!: any;

  @Field(() => [String], { nullable: true })
  requirements!: Array<string>;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  behavioural_competencies?: Array<JobProfileBehaviouralCompetency>;

  @Field(() => [JobProfileClassification], { nullable: true })
  classifications?: Array<JobProfileClassification>;

  @Field(() => [JobProfileOrganization], { nullable: true })
  organizations?: Array<JobProfileOrganization>;

  @Field(() => JobProfileCareerGroup, { nullable: true })
  career_group?: JobProfileCareerGroup | null;

  @Field(() => JobProfileContext, { nullable: true })
  context?: JobProfileContext | null;

  @Field(() => JobProfileJobFamily, { nullable: true })
  job_family?: JobProfileJobFamily | null;

  @Field(() => JobProfileRole, { nullable: true })
  role?: JobProfileRole | null;

  @Field(() => JobProfileStream, { nullable: true })
  stream?: JobProfileStream | null;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reports_to?: Array<JobProfileReportsTo>;

  @Field(() => [PositionRequest], { nullable: true })
  position_request?: Array<PositionRequest>;
}
