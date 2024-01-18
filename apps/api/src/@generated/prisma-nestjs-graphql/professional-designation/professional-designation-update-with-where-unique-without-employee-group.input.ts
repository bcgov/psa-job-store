import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationUpdateWithoutEmployee_groupInput } from './professional-designation-update-without-employee-group.input';

@InputType()
export class ProfessionalDesignationUpdateWithWhereUniqueWithoutEmployee_groupInput {
  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => ProfessionalDesignationUpdateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateWithoutEmployee_groupInput)
  data!: ProfessionalDesignationUpdateWithoutEmployee_groupInput;
}
