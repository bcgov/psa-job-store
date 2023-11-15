import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { EnumJobProfileStateFilter } from '../prisma/enum-job-profile-state-filter.input';
import { EnumJobStreamFilter } from '../prisma/enum-job-stream-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';

@InputType()
export class JobProfileScalarWhereInput {
  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileScalarWhereInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileScalarWhereInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  career_group_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  family_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  ministry_id?: IntFilter;

  @Field(() => UuidFilter, { nullable: true })
  owner_id?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  parent_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  role_id?: IntFilter;

  @Field(() => EnumJobProfileStateFilter, { nullable: true })
  state?: EnumJobProfileStateFilter;

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

  @Field(() => JsonFilter, { nullable: true })
  accountabilities?: JsonFilter;

  @Field(() => StringListFilter, { nullable: true })
  requirements?: StringListFilter;
}
