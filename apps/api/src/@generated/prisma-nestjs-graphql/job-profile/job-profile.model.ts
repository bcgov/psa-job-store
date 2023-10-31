import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';
import { JobCategory } from '../job-category/job-category.model';
import { Classification } from '../classification/classification.model';
import { JobFamily } from '../job-family/job-family.model';
import { Ministry } from '../ministry/ministry.model';
import { User } from '../user/user.model';
import { JobRole } from '../job-role/job-role.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: true })
  category_id!: number | null;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: true })
  family_id!: number | null;

  @Field(() => Int, { nullable: true })
  ministry_id!: number | null;

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

  @Field(() => JobCategory, { nullable: true })
  category?: JobCategory | null;

  @Field(() => [JobProfile], { nullable: true })
  children?: Array<JobProfile>;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => JobFamily, { nullable: true })
  family?: JobFamily | null;

  @Field(() => Ministry, { nullable: true })
  ministry?: Ministry | null;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => JobProfile, { nullable: true })
  parent?: JobProfile | null;

  @Field(() => JobRole, { nullable: true })
  role?: JobRole | null;
}
