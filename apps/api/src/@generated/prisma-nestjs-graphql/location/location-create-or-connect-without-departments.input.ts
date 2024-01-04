import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { Type } from 'class-transformer';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';

@InputType()
export class LocationCreateOrConnectWithoutDepartmentsInput {
  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationCreateWithoutDepartmentsInput)
  create!: LocationCreateWithoutDepartmentsInput;
}
