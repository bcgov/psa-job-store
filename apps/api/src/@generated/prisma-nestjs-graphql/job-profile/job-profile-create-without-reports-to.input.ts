import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-job-profile.input';
import { CareerGroupCreateNestedOneWithoutProfilesInput } from '../career-group/career-group-create-nested-one-without-profiles.input';
import { JobProfileCreateNestedManyWithoutParentInput } from './job-profile-create-nested-many-without-parent.input';
import { ClassificationCreateNestedOneWithoutJob_profilesInput } from '../classification/classification-create-nested-one-without-job-profiles.input';
import { JobFamilyCreateNestedOneWithoutProfilesInput } from '../job-family/job-family-create-nested-one-without-profiles.input';
import { OrganizationCreateNestedOneWithoutJob_provilesInput } from '../organization/organization-create-nested-one-without-job-proviles.input';
import { UserCreateNestedOneWithoutJob_profilesInput } from '../user/user-create-nested-one-without-job-profiles.input';
import { JobProfileCreateNestedOneWithoutChildrenInput } from './job-profile-create-nested-one-without-children.input';
import { JobRoleCreateNestedOneWithoutProfilesInput } from '../job-role/job-role-create-nested-one-without-profiles.input';

@InputType()
export class JobProfileCreateWithoutReports_toInput {
  @Field(() => JobProfileState, { nullable: false })
  state!: keyof typeof JobProfileState;

  @Field(() => JobStream, { nullable: false })
  stream!: keyof typeof JobStream;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: false })
  context!: string;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  accountabilities?: any;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput;

  @Field(() => CareerGroupCreateNestedOneWithoutProfilesInput, { nullable: true })
  career_group?: CareerGroupCreateNestedOneWithoutProfilesInput;

  @Field(() => JobProfileCreateNestedManyWithoutParentInput, { nullable: true })
  children?: JobProfileCreateNestedManyWithoutParentInput;

  @Field(() => ClassificationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobFamilyCreateNestedOneWithoutProfilesInput, { nullable: true })
  family?: JobFamilyCreateNestedOneWithoutProfilesInput;

  @Field(() => OrganizationCreateNestedOneWithoutJob_provilesInput, { nullable: true })
  organization?: OrganizationCreateNestedOneWithoutJob_provilesInput;

  @Field(() => UserCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  owner?: UserCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileCreateNestedOneWithoutChildrenInput, { nullable: true })
  parent?: JobProfileCreateNestedOneWithoutChildrenInput;

  @Field(() => JobRoleCreateNestedOneWithoutProfilesInput, { nullable: true })
  role?: JobRoleCreateNestedOneWithoutProfilesInput;
}
