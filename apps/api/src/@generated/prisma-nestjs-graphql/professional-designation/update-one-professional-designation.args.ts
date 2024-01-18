import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationUpdateInput } from './professional-designation-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';

@ArgsType()
export class UpdateOneProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationUpdateInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateInput)
  data!: ProfessionalDesignationUpdateInput;

  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;
}
