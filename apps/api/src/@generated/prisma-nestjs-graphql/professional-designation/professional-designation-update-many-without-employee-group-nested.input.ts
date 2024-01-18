import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateWithoutEmployee_groupInput } from './professional-designation-create-without-employee-group.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput } from './professional-designation-create-or-connect-without-employee-group.input';
import { ProfessionalDesignationUpsertWithWhereUniqueWithoutEmployee_groupInput } from './professional-designation-upsert-with-where-unique-without-employee-group.input';
import { ProfessionalDesignationCreateManyEmployee_groupInputEnvelope } from './professional-designation-create-many-employee-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { ProfessionalDesignationUpdateWithWhereUniqueWithoutEmployee_groupInput } from './professional-designation-update-with-where-unique-without-employee-group.input';
import { ProfessionalDesignationUpdateManyWithWhereWithoutEmployee_groupInput } from './professional-designation-update-many-with-where-without-employee-group.input';
import { ProfessionalDesignationScalarWhereInput } from './professional-designation-scalar-where.input';

@InputType()
export class ProfessionalDesignationUpdateManyWithoutEmployee_groupNestedInput {
  @Field(() => [ProfessionalDesignationCreateWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationCreateWithoutEmployee_groupInput)
  create?: Array<ProfessionalDesignationCreateWithoutEmployee_groupInput>;

  @Field(() => [ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput)
  connectOrCreate?: Array<ProfessionalDesignationCreateOrConnectWithoutEmployee_groupInput>;

  @Field(() => [ProfessionalDesignationUpsertWithWhereUniqueWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationUpsertWithWhereUniqueWithoutEmployee_groupInput)
  upsert?: Array<ProfessionalDesignationUpsertWithWhereUniqueWithoutEmployee_groupInput>;

  @Field(() => ProfessionalDesignationCreateManyEmployee_groupInputEnvelope, { nullable: true })
  @Type(() => ProfessionalDesignationCreateManyEmployee_groupInputEnvelope)
  createMany?: ProfessionalDesignationCreateManyEmployee_groupInputEnvelope;

  @Field(() => [ProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>>;

  @Field(() => [ProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>>;

  @Field(() => [ProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>>;

  @Field(() => [ProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>>;

  @Field(() => [ProfessionalDesignationUpdateWithWhereUniqueWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationUpdateWithWhereUniqueWithoutEmployee_groupInput)
  update?: Array<ProfessionalDesignationUpdateWithWhereUniqueWithoutEmployee_groupInput>;

  @Field(() => [ProfessionalDesignationUpdateManyWithWhereWithoutEmployee_groupInput], { nullable: true })
  @Type(() => ProfessionalDesignationUpdateManyWithWhereWithoutEmployee_groupInput)
  updateMany?: Array<ProfessionalDesignationUpdateManyWithWhereWithoutEmployee_groupInput>;

  @Field(() => [ProfessionalDesignationScalarWhereInput], { nullable: true })
  @Type(() => ProfessionalDesignationScalarWhereInput)
  deleteMany?: Array<ProfessionalDesignationScalarWhereInput>;
}
