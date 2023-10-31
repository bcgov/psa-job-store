import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileState } from '../prisma/job-profile-state.enum';
import { JobStream } from '../prisma/job-stream.enum';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-job-profile.input';
import { JobProfileUncheckedCreateNestedManyWithoutParentInput } from './job-profile-unchecked-create-nested-many-without-parent.input';

@InputType()
export class JobProfileUncheckedCreateWithoutReports_toInput {
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

  @Field(() => String, { nullable: true })
  owner_id?: string;

  @Field(() => Int, { nullable: true })
  parent_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

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

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutJob_profileInput;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutParentInput, { nullable: true })
  children?: JobProfileUncheckedCreateNestedManyWithoutParentInput;
}
