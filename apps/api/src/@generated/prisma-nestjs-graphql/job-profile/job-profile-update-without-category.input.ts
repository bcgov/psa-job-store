import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-job-profile-nested.input';
import { JobProfileReportsToUpdateManyWithoutJob_profileNestedInput } from '../job-profile-reports-to/job-profile-reports-to-update-many-without-job-profile-nested.input';
import { ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../classification/classification-update-one-required-without-job-profiles-nested.input';
import { JobFamilyUpdateOneWithoutProfilesNestedInput } from '../job-family/job-family-update-one-without-profiles-nested.input';
import { MinistryUpdateOneWithoutJob_profilesNestedInput } from '../ministry/ministry-update-one-without-job-profiles-nested.input';
import { JobRoleUpdateOneWithoutProfilesNestedInput } from '../job-role/job-role-update-one-without-profiles-nested.input';

@InputType()
export class JobProfileUpdateWithoutCategoryInput {
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

  @Field(() => [String], { nullable: true })
  accountabilities_required?: Array<string>;

  @Field(() => [String], { nullable: true })
  accountabilities_optional?: Array<string>;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUpdateManyWithoutJob_profileNestedInput;

  @Field(() => JobProfileReportsToUpdateManyWithoutJob_profileNestedInput, { nullable: true })
  reports_to?: JobProfileReportsToUpdateManyWithoutJob_profileNestedInput;

  @Field(() => ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput;

  @Field(() => JobFamilyUpdateOneWithoutProfilesNestedInput, { nullable: true })
  family?: JobFamilyUpdateOneWithoutProfilesNestedInput;

  @Field(() => MinistryUpdateOneWithoutJob_profilesNestedInput, { nullable: true })
  ministry?: MinistryUpdateOneWithoutJob_profilesNestedInput;

  @Field(() => JobRoleUpdateOneWithoutProfilesNestedInput, { nullable: true })
  role?: JobRoleUpdateOneWithoutProfilesNestedInput;
}
