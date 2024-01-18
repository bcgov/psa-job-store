import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';

@InputType()
export class ProfessionalDesignationListRelationFilter {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  every?: ProfessionalDesignationWhereInput;

  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  some?: ProfessionalDesignationWhereInput;

  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  none?: ProfessionalDesignationWhereInput;
}
