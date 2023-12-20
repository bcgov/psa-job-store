import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class CareerGroupWhereInput {
  @Field(() => [CareerGroupWhereInput], { nullable: true })
  AND?: Array<CareerGroupWhereInput>;

  @Field(() => [CareerGroupWhereInput], { nullable: true })
  OR?: Array<CareerGroupWhereInput>;

  @Field(() => [CareerGroupWhereInput], { nullable: true })
  NOT?: Array<CareerGroupWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
