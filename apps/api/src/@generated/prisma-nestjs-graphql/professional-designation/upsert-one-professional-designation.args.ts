import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateInput } from './professional-designation-create.input';
import { ProfessionalDesignationUpdateInput } from './professional-designation-update.input';

@ArgsType()
export class UpsertOneProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => ProfessionalDesignationCreateInput, { nullable: false })
  @Type(() => ProfessionalDesignationCreateInput)
  create!: ProfessionalDesignationCreateInput;

  @Field(() => ProfessionalDesignationUpdateInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateInput)
  update!: ProfessionalDesignationUpdateInput;
}
