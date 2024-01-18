import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;
}
