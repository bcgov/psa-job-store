import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileReportsToCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-job-profile.input';
import { JobCategoryCreateNestedOneWithoutProfilesInput } from '../job-category/job-category-create-nested-one-without-profiles.input';
import { JobProfileCreateNestedManyWithoutParentInput } from './job-profile-create-nested-many-without-parent.input';
import { ClassificationCreateNestedOneWithoutJob_profilesInput } from '../classification/classification-create-nested-one-without-job-profiles.input';
import { JobFamilyCreateNestedOneWithoutProfilesInput } from '../job-family/job-family-create-nested-one-without-profiles.input';
import { MinistryCreateNestedOneWithoutJob_profilesInput } from '../ministry/ministry-create-nested-one-without-job-profiles.input';
import { UserCreateNestedOneWithoutJobProfileInput } from '../user/user-create-nested-one-without-job-profile.input';
import { JobProfileCreateNestedOneWithoutChildrenInput } from './job-profile-create-nested-one-without-children.input';
import { JobRoleCreateNestedOneWithoutProfilesInput } from '../job-role/job-role-create-nested-one-without-profiles.input';

@InputType()
export class JobProfileCreateWithoutBehavioural_competenciesInput {
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

  @Field(() => JobProfileReportsToCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobCategoryCreateNestedOneWithoutProfilesInput, { nullable: true })
  category?: JobCategoryCreateNestedOneWithoutProfilesInput;

  @Field(() => JobProfileCreateNestedManyWithoutParentInput, { nullable: true })
  children?: JobProfileCreateNestedManyWithoutParentInput;

  @Field(() => ClassificationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobFamilyCreateNestedOneWithoutProfilesInput, { nullable: true })
  family?: JobFamilyCreateNestedOneWithoutProfilesInput;

  @Field(() => MinistryCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  ministry?: MinistryCreateNestedOneWithoutJob_profilesInput;

  @Field(() => UserCreateNestedOneWithoutJobProfileInput, { nullable: true })
  owner?: UserCreateNestedOneWithoutJobProfileInput;

  @Field(() => JobProfileCreateNestedOneWithoutChildrenInput, { nullable: true })
  parent?: JobProfileCreateNestedOneWithoutChildrenInput;

  @Field(() => JobRoleCreateNestedOneWithoutProfilesInput, { nullable: true })
  role?: JobRoleCreateNestedOneWithoutProfilesInput;
}
