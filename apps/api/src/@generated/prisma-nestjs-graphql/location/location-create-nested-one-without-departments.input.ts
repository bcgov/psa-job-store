import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutDepartmentsInput } from './location-create-or-connect-without-departments.input';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
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
