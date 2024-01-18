import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateWithoutEmployee_groupInput } from './professional-designation-create-without-employee-group.input';

@InputType()
export class ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput {
  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => ProfessionalDesignationCreateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ProfessionalDesignationCreateWithoutEmployee_groupInput)
  create!: ProfessionalDesignationCreateWithoutEmployee_groupInput;
}
