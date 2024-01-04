import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutDepartmentsInput } from './location-create-or-connect-without-departments.input';
import { LocationUpsertWithoutDepartmentsInput } from './location-upsert-without-departments.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { LocationUpdateToOneWithWhereWithoutDepartmentsInput } from './location-update-to-one-with-where-without-departments.input';

@InputType()
export class LocationUpdateOneRequiredWithoutDepartmentsNestedInput {
  @Field(() => LocationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationCreateWithoutDepartmentsInput)
  create?: LocationCreateWithoutDepartmentsInput;

  @Field(() => LocationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: LocationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => LocationUpsertWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationUpsertWithoutDepartmentsInput)
  upsert?: LocationUpsertWithoutDepartmentsInput;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  @Type(() => LocationWhereUniqueInput)
  connect?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationUpdateToOneWithWhereWithoutDepartmentsInput, { nullable: true })
  @Type(() => LocationUpdateToOneWithWhereWithoutDepartmentsInput)
  update?: LocationUpdateToOneWithWhereWithoutDepartmentsInput;
}
