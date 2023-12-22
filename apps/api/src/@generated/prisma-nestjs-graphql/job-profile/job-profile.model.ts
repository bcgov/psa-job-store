import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { PositionRequest } from '../position-request/position-request.model';
import { CareerGroup } from '../career-group/career-group.model';
import { Classification } from '../classification/classification.model';
import { JobFamily } from '../job-family/job-family.model';
import { Organization } from '../organization/organization.model';
import { User } from '../user/user.model';
import { JobRole } from '../job-role/job-role.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: true })
  career_group_id!: number | null;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => Int, { nullable: true })
  family_id!: number | null;

  @Field(() => String, { nullable: true })
  organization_id!: string | null;

  @Field(() => String, { nullable: true })
  owner_id!: string | null;

  @Field(() => Int, { nullable: true })
  parent_id!: number | null;

  @Field(() => Int, { nullable: true })
  role_id!: number | null;

  @Field(() => JobProfileState, { nullable: false })
  state!: keyof typeof JobProfileState;

  @Field(() => JobStream, { nullable: false })
  stream!: keyof typeof JobStream;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: true })
  number!: number | null;

  @Field(() => String, { nullable: false })
  context!: string;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: false, defaultValue: '{"optional": [], "required": []}' })
  accountabilities!: any;

  @Field(() => [String], { nullable: true })
  requirements!: Array<string>;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  behavioural_competencies?: Array<JobProfileBehaviouralCompetency>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reports_to?: Array<JobProfileReportsTo>;

  @Field(() => [PositionRequest], { nullable: true })
  position_request?: Array<PositionRequest>;

  @Field(() => CareerGroup, { nullable: true })
  career_group?: CareerGroup | null;

  @Field(() => [JobProfile], { nullable: true })
  children?: Array<JobProfile>;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => JobFamily, { nullable: true })
  family?: JobFamily | null;

  @Field(() => Organization, { nullable: true })
  organization?: Organization | null;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => JobProfile, { nullable: true })
  parent?: JobProfile | null;

  @Field(() => JobRole, { nullable: true })
  role?: JobRole | null;
}
