import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutLocationInput } from './department-create-without-location.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutLocationInput } from './department-create-or-connect-without-location.input';
import { DepartmentUpsertWithWhereUniqueWithoutLocationInput } from './department-upsert-with-where-unique-without-location.input';
import { DepartmentCreateManyLocationInputEnvelope } from './department-create-many-location-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateWithWhereUniqueWithoutLocationInput } from './department-update-with-where-unique-without-location.input';
import { DepartmentUpdateManyWithWhereWithoutLocationInput } from './department-update-many-with-where-without-location.input';
import { DepartmentScalarWhereInput } from './department-scalar-where.input';

@InputType()
export class DepartmentUncheckedUpdateManyWithoutLocationNestedInput {
  @Field(() => [DepartmentCreateWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentCreateWithoutLocationInput)
  create?: Array<DepartmentCreateWithoutLocationInput>;

  @Field(() => [DepartmentCreateOrConnectWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutLocationInput)
  connectOrCreate?: Array<DepartmentCreateOrConnectWithoutLocationInput>;

  @Field(() => [DepartmentUpsertWithWhereUniqueWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentUpsertWithWhereUniqueWithoutLocationInput)
  upsert?: Array<DepartmentUpsertWithWhereUniqueWithoutLocationInput>;

  @Field(() => DepartmentCreateManyLocationInputEnvelope, { nullable: true })
  @Type(() => DepartmentCreateManyLocationInputEnvelope)
  createMany?: DepartmentCreateManyLocationInputEnvelope;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  set?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;

  @Field(() => [DepartmentUpdateWithWhereUniqueWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentUpdateWithWhereUniqueWithoutLocationInput)
  update?: Array<DepartmentUpdateWithWhereUniqueWithoutLocationInput>;

  @Field(() => [DepartmentUpdateManyWithWhereWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentUpdateManyWithWhereWithoutLocationInput)
  updateMany?: Array<DepartmentUpdateManyWithWhereWithoutLocationInput>;

  @Field(() => [DepartmentScalarWhereInput], { nullable: true })
  @Type(() => DepartmentScalarWhereInput)
  deleteMany?: Array<DepartmentScalarWhereInput>;
}
