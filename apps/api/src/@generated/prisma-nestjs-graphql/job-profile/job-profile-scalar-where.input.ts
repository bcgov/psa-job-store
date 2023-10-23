import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumJobStreamFilter } from '../prisma/enum-job-stream-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

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
}
