import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class PositionScalarWhereInput {
  @Field(() => [PositionScalarWhereInput], { nullable: true })
  AND?: Array<PositionScalarWhereInput>;

  @Field(() => [PositionScalarWhereInput], { nullable: true })
  OR?: Array<PositionScalarWhereInput>;

  @Field(() => [PositionScalarWhereInput], { nullable: true })
  NOT?: Array<PositionScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  supervisor_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  job_profile_number?: StringFilter;

  @Field(() => BoolFilter, { nullable: true })
  is_empty?: BoolFilter;

  @Field(() => BoolFilter, { nullable: true })
  is_vacant?: BoolFilter;
}
