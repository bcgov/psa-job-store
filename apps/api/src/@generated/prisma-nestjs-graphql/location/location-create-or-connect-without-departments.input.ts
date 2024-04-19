import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
import { LocationWhereUniqueInput } from './location-where-unique.input';

@InputType()
export class LocationCreateOrConnectWithoutDepartmentsInput {
  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationCreateWithoutDepartmentsInput)
  create!: LocationCreateWithoutDepartmentsInput;
}
