import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateInput } from './professional-designation-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationCreateInput, { nullable: false })
  @Type(() => ProfessionalDesignationCreateInput)
  data!: ProfessionalDesignationCreateInput;
}
