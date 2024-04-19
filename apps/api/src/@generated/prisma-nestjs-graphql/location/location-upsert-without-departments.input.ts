import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationCreateWithoutDepartmentsInput } from './location-create-without-departments.input';
import { LocationUpdateWithoutDepartmentsInput } from './location-update-without-departments.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationUpsertWithoutDepartmentsInput {
  @Field(() => LocationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutDepartmentsInput)
  update!: LocationUpdateWithoutDepartmentsInput;

  @Field(() => LocationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationCreateWithoutDepartmentsInput)
  create!: LocationCreateWithoutDepartmentsInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;
}
