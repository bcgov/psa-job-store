import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutLocationInput } from './department-create-without-location.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutLocationInput } from './department-create-or-connect-without-location.input';
import { DepartmentCreateManyLocationInputEnvelope } from './department-create-many-location-input-envelope.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentUncheckedCreateNestedManyWithoutLocationInput {
  @Field(() => [DepartmentCreateWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentCreateWithoutLocationInput)
  create?: Array<DepartmentCreateWithoutLocationInput>;

  @Field(() => [DepartmentCreateOrConnectWithoutLocationInput], { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutLocationInput)
  connectOrCreate?: Array<DepartmentCreateOrConnectWithoutLocationInput>;

  @Field(() => DepartmentCreateManyLocationInputEnvelope, { nullable: true })
  @Type(() => DepartmentCreateManyLocationInputEnvelope)
  createMany?: DepartmentCreateManyLocationInputEnvelope;

  @Field(() => [DepartmentWhereUniqueInput], { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>>;
}
