import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';

@InputType()
export class ProfessionalDesignationRelationFilter {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  is?: ProfessionalDesignationWhereInput;

  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  isNot?: ProfessionalDesignationWhereInput;
}
