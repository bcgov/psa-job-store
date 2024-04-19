import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutDepartmentsInput } from './location-create-or-connect-without-departments.input';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
import { LocationUpdateToOneWithWhereWithoutDepartmentsInput } from './location-update-to-one-with-where-without-departments.input';
import { LocationUpsertWithoutDepartmentsInput } from './location-upsert-without-departments.input';
import { LocationWhereUniqueInput } from './location-where-unique.input';

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
