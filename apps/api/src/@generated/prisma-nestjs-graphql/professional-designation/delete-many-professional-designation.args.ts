import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;
}
