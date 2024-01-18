import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ProfessionalDesignationScalarWhereInput {
  @Field(() => [ProfessionalDesignationScalarWhereInput], { nullable: true })
  AND?: Array<ProfessionalDesignationScalarWhereInput>;

  @Field(() => [ProfessionalDesignationScalarWhereInput], { nullable: true })
  OR?: Array<ProfessionalDesignationScalarWhereInput>;

  @Field(() => [ProfessionalDesignationScalarWhereInput], { nullable: true })
  NOT?: Array<ProfessionalDesignationScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  employee_group_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;
}
