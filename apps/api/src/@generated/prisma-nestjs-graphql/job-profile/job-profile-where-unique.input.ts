import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumJobStreamFilter } from '../prisma/enum-job-stream-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { MinistryRelationFilter } from '../ministry/ministry-relation-filter.input';

@InputType()
export class JobProfileWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  AND?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  OR?: Array<JobProfileWhereInput>;

  @Field(() => [JobProfileWhereInput], { nullable: true })
  NOT?: Array<JobProfileWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  classification_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  ministry_id?: IntFilter;

  @Field(() => EnumJobStreamFilter, { nullable: true })
  stream?: EnumJobStreamFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  context?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  overview?: StringFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => MinistryRelationFilter, { nullable: true })
  ministry?: MinistryRelationFilter;
}
