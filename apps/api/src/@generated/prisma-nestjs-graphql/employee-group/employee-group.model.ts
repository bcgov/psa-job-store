import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ProfessionalDesignation } from '../professional-designation/professional-designation.model';

@ObjectType()
export class EmployeeGroup {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [ProfessionalDesignation], { nullable: true })
  professional_designations?: Array<ProfessionalDesignation>;
}
