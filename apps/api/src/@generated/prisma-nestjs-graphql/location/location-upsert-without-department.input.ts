import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationUpdateWithoutDepartmentInput } from './location-update-without-department.input';
import { Type } from 'class-transformer';
import { LocationCreateWithoutDepartmentInput } from './location-create-without-department.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationUpsertWithoutDepartmentInput {
  @Field(() => LocationUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => LocationUpdateWithoutDepartmentInput)
  update!: LocationUpdateWithoutDepartmentInput;

  @Field(() => LocationCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => LocationCreateWithoutDepartmentInput)
  create!: LocationCreateWithoutDepartmentInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;
}
