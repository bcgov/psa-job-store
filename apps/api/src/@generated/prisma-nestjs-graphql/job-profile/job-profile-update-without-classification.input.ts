import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-job-profile-nested.input';
import { JobProfileReportsToUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-job-profile-nested.input';
import { CareerGroupUpdateOneWithoutProfilesNestedInput } from '../career-group/career-group-update-one-without-profiles-nested.input';
import { JobProfileUpdateManyWithoutParentNestedInput } from './job-profile-update-many-without-parent-nested.input';
import { JobFamilyUpdateOneWithoutProfilesNestedInput } from '../job-family/job-family-update-one-without-profiles-nested.input';
import { OrganizationUpdateOneWithoutJob_provilesNestedInput } from '../organization/organization-update-one-without-job-proviles-nested.input';
import { UserUpdateOneWithoutJob_profilesNestedInput } from '../user/user-update-one-without-job-profiles-nested.input';
import { JobProfileUpdateOneWithoutChildrenNestedInput } from './job-profile-update-one-without-children-nested.input';
import { JobRoleUpdateOneWithoutProfilesNestedInput } from '../job-role/job-role-update-one-without-profiles-nested.input';

@InputType()
export class JobProfileUpdateWithoutClassificationInput {
  @Field(() => JobProfileState, { nullable: true })
  state?: keyof typeof JobProfileState;

  @Field(() => JobStream, { nullable: true })
  stream?: keyof typeof JobStream;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  context?: string;

  @Field(() => String, { nullable: true })
  overview?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUpdateManyWithoutJob_profileNestedInput;

  @Field(() => CareerGroupUpdateOneWithoutProfilesNestedInput, { nullable: true })
  career_group?: CareerGroupUpdateOneWithoutProfilesNestedInput;

  @Field(() => JobProfileUpdateManyWithoutParentNestedInput, { nullable: true })
  children?: JobProfileUpdateManyWithoutParentNestedInput;

  @Field(() => JobFamilyUpdateOneWithoutProfilesNestedInput, { nullable: true })
  family?: JobFamilyUpdateOneWithoutProfilesNestedInput;

  @Field(() => OrganizationUpdateOneWithoutJob_provilesNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneWithoutJob_provilesNestedInput;

  @Field(() => UserUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  owner?: UserUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobProfileUpdateOneWithoutChildrenNestedInput, { nullable: true })
  parent?: JobProfileUpdateOneWithoutChildrenNestedInput;

  @Field(() => JobRoleUpdateOneWithoutProfilesNestedInput, { nullable: true })
  role?: JobRoleUpdateOneWithoutProfilesNestedInput;
}
