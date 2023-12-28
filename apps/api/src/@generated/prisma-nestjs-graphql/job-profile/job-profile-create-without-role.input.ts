import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobProfileType } from '../prisma/job-profile-type.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-job-profile.input';
import { JobProfileClassificationCreateNestedManyWithoutJob_profileInput } from '../job-profile-classification/job-profile-classification-create-nested-many-without-job-profile.input';
import { JobProfileCareerGroupCreateNestedOneWithoutJob_profilesInput } from '../job-profile-career-group/job-profile-career-group-create-nested-one-without-job-profiles.input';
import { JobProfileContextCreateNestedOneWithoutJob_profileInput } from '../job-profile-context/job-profile-context-create-nested-one-without-job-profile.input';
import { JobProfileJobFamilyCreateNestedOneWithoutJob_profilesInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profiles.input';
import { OrganizationCreateNestedOneWithoutJob_profilesInput } from '../organization/organization-create-nested-one-without-job-profiles.input';
import { JobProfileStreamCreateNestedOneWithoutJob_profilesInput } from '../job-profile-stream/job-profile-stream-create-nested-one-without-job-profiles.input';
import { JobProfileReportsToCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-job-profile.input';
import { PositionRequestCreateNestedManyWithoutParent_job_profileInput } from '../position-request/position-request-create-nested-many-without-parent-job-profile.input';

@InputType()
export class JobProfileCreateWithoutRoleInput {
  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobProfileType, { nullable: false })
  type!: keyof typeof JobProfileType;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileClassificationCreateNestedManyWithoutJob_profileInput, { nullable: true })
  classifications?: JobProfileClassificationCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileCareerGroupCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  career_group?: JobProfileCareerGroupCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileContextCreateNestedOneWithoutJob_profileInput, { nullable: true })
  context?: JobProfileContextCreateNestedOneWithoutJob_profileInput;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  job_family?: JobProfileJobFamilyCreateNestedOneWithoutJob_profilesInput;

  @Field(() => OrganizationCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  organization?: OrganizationCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileStreamCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  stream?: JobProfileStreamCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileReportsToCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToCreateNestedManyWithoutJob_profileInput;

  @Field(() => PositionRequestCreateNestedManyWithoutParent_job_profileInput, { nullable: true })
  position_request?: PositionRequestCreateNestedManyWithoutParent_job_profileInput;
}
