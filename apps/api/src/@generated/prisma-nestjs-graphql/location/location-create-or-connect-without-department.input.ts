import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { Type } from 'class-transformer';
import { LocationCreateWithoutDepartmentInput } from './location-create-without-department.input';

@InputType()
export class LocationCreateOrConnectWithoutDepartmentInput {
  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => LocationCreateWithoutDepartmentInput)
  create!: LocationCreateWithoutDepartmentInput;
}
