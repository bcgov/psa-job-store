import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-job-profile.input';
import { JobProfileReportsToCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-create-nested-many-without-job-profile.input';
import { JobCategoryCreateNestedOneWithoutProfilesInput } from '../job-category/job-category-create-nested-one-without-profiles.input';
import { JobFamilyCreateNestedOneWithoutProfilesInput } from '../job-family/job-family-create-nested-one-without-profiles.input';
import { MinistryCreateNestedOneWithoutJob_profilesInput } from '../ministry/ministry-create-nested-one-without-job-profiles.input';
import { JobRoleCreateNestedOneWithoutProfilesInput } from '../job-role/job-role-create-nested-one-without-profiles.input';

@InputType()
export class JobProfileCreateWithoutClassificationInput {
  @Field(() => JobStream, { nullable: false })
  stream!: keyof typeof JobStream;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

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

  @Field(() => JobProfileReportsToCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobCategoryCreateNestedOneWithoutProfilesInput, { nullable: true })
  category?: JobCategoryCreateNestedOneWithoutProfilesInput;

  @Field(() => JobFamilyCreateNestedOneWithoutProfilesInput, { nullable: true })
  family?: JobFamilyCreateNestedOneWithoutProfilesInput;

  @Field(() => MinistryCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  ministry?: MinistryCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobRoleCreateNestedOneWithoutProfilesInput, { nullable: true })
  role?: JobRoleCreateNestedOneWithoutProfilesInput;
}
