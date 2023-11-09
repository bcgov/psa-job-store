import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class CareerGroupWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [CareerGroupWhereInput], { nullable: true })
  AND?: Array<CareerGroupWhereInput>;

  @Field(() => [CareerGroupWhereInput], { nullable: true })
  OR?: Array<CareerGroupWhereInput>;

  @Field(() => [CareerGroupWhereInput], { nullable: true })
  NOT?: Array<CareerGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
