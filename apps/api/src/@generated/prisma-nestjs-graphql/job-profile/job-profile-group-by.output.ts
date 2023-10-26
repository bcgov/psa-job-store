import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { JobProfileCountAggregate } from './job-profile-count-aggregate.output';
import { JobProfileAvgAggregate } from './job-profile-avg-aggregate.output';
import { JobProfileSumAggregate } from './job-profile-sum-aggregate.output';
import { JobProfileMinAggregate } from './job-profile-min-aggregate.output';
import { JobProfileMaxAggregate } from './job-profile-max-aggregate.output';

@ObjectType()
export class JobProfileGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

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

  @Field(() => JobProfileCountAggregate, { nullable: true })
  _count?: JobProfileCountAggregate;

  @Field(() => JobProfileAvgAggregate, { nullable: true })
  _avg?: JobProfileAvgAggregate;

  @Field(() => JobProfileSumAggregate, { nullable: true })
  _sum?: JobProfileSumAggregate;

  @Field(() => JobProfileMinAggregate, { nullable: true })
  _min?: JobProfileMinAggregate;

  @Field(() => JobProfileMaxAggregate, { nullable: true })
  _max?: JobProfileMaxAggregate;
}
