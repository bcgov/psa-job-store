import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutClassificationInput } from './employee-create-without-classification.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutClassificationInput } from './employee-create-or-connect-without-classification.input';
import { EmployeeUpsertWithWhereUniqueWithoutClassificationInput } from './employee-upsert-with-where-unique-without-classification.input';
import { EmployeeCreateManyClassificationInputEnvelope } from './employee-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { EmployeeUpdateWithWhereUniqueWithoutClassificationInput } from './employee-update-with-where-unique-without-classification.input';
import { EmployeeUpdateManyWithWhereWithoutClassificationInput } from './employee-update-many-with-where-without-classification.input';
import { EmployeeScalarWhereInput } from './employee-scalar-where.input';

@InputType()
export class EmployeeUncheckedUpdateManyWithoutClassificationNestedInput {
  @Field(() => [EmployeeCreateWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutClassificationInput)
  create?: Array<EmployeeCreateWithoutClassificationInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutClassificationInput>;

  @Field(() => [EmployeeUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<EmployeeUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => EmployeeCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyClassificationInputEnvelope)
  createMany?: EmployeeCreateManyClassificationInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  set?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<EmployeeUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [EmployeeUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<EmployeeUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  @Type(() => EmployeeScalarWhereInput)
  deleteMany?: Array<EmployeeScalarWhereInput>;
}
