import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutDepartmentsInput } from './location-create-or-connect-without-departments.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';

@InputType()
export class LocationCreateNestedOneWithoutDepartmentsInput {
  @Field(() => LocationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationCreateWithoutDepartmentsInput)
  create?: LocationCreateWithoutDepartmentsInput;

  @Field(() => LocationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: LocationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  @Type(() => LocationWhereUniqueInput)
  connect?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;
}
