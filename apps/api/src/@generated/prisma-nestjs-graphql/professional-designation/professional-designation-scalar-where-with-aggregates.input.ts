import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ProfessionalDesignationScalarWhereWithAggregatesInput {
  @Field(() => [ProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => [ProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => [ProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  employee_group_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
