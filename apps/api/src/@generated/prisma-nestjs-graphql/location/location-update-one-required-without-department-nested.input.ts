import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateWithoutDepartmentInput } from './location-create-without-department.input';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutDepartmentInput } from './location-create-or-connect-without-department.input';
import { LocationUpsertWithoutDepartmentInput } from './location-upsert-without-department.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { LocationUpdateToOneWithWhereWithoutDepartmentInput } from './location-update-to-one-with-where-without-department.input';

@InputType()
export class LocationUpdateOneRequiredWithoutDepartmentNestedInput {
  @Field(() => LocationCreateWithoutDepartmentInput, { nullable: true })
  @Type(() => LocationCreateWithoutDepartmentInput)
  create?: LocationCreateWithoutDepartmentInput;

  @Field(() => LocationCreateOrConnectWithoutDepartmentInput, { nullable: true })
  @Type(() => LocationCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: LocationCreateOrConnectWithoutDepartmentInput;

  @Field(() => LocationUpsertWithoutDepartmentInput, { nullable: true })
  @Type(() => LocationUpsertWithoutDepartmentInput)
  upsert?: LocationUpsertWithoutDepartmentInput;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  @Type(() => LocationWhereUniqueInput)
  connect?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationUpdateToOneWithWhereWithoutDepartmentInput, { nullable: true })
  @Type(() => LocationUpdateToOneWithWhereWithoutDepartmentInput)
  update?: LocationUpdateToOneWithWhereWithoutDepartmentInput;
}
