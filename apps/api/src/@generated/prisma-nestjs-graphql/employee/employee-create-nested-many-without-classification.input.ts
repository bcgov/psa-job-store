import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutClassificationInput } from './employee-create-without-classification.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutClassificationInput } from './employee-create-or-connect-without-classification.input';
import { EmployeeCreateManyClassificationInputEnvelope } from './employee-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';

@InputType()
export class EmployeeCreateNestedManyWithoutClassificationInput {
  @Field(() => [EmployeeCreateWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutClassificationInput)
  create?: Array<EmployeeCreateWithoutClassificationInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutClassificationInput>;

  @Field(() => EmployeeCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyClassificationInputEnvelope)
  createMany?: EmployeeCreateManyClassificationInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;
}
