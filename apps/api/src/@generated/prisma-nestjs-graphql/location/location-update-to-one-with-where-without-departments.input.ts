import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationUpdateWithoutDepartmentsInput } from './location-update-without-departments.input';

@InputType()
export class LocationUpdateToOneWithWhereWithoutDepartmentsInput {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => LocationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutDepartmentsInput)
  data!: LocationUpdateWithoutDepartmentsInput;
}
