import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-create-nested-many-without-job-profile.input';

@InputType()
export class JobProfileUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  category_id?: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: true })
  family_id?: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

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

  @Field(() => [String], { nullable: true })
  accountabilities_required?: Array<string>;

  @Field(() => [String], { nullable: true })
  accountabilities_optional?: Array<string>;

  @Field(() => [String], { nullable: true })
  requirements?: Array<string>;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  reports_to?: JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput;
}
