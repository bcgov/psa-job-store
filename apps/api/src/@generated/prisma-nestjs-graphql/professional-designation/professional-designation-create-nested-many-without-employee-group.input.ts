import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateWithoutEmployee_groupInput } from './professional-designation-create-without-employee-group.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput } from './professional-designation-create-or-connect-without-employee-group.input';
import { ProfessionalDesignationCreateManyEmployee_groupInputEnvelope } from './professional-designation-create-many-employee-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';

@InputType()
export class ProfessionalDesignationCreateNestedManyWithoutEmployee_groupInput {
  @Field(() => [ProfessionalDesignationCreateWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationCreateWithoutEmployee_groupInput)
  create?: Array<ProfessionalDesignationCreateWithoutEmployee_groupInput>;

  @Field(() => [ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput)
  connectOrCreate?: Array<ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput>;

  @Field(() => ProfessionalDesignationCreateManyEmployee_groupInputEnvelope, { nullable: true })
  @Type(() => ProfessionalDesignationCreateManyEmployee_groupInputEnvelope)
  createMany?: ProfessionalDesignationCreateManyEmployee_groupInputEnvelope;

  @Field(() => [ProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>>;
}
