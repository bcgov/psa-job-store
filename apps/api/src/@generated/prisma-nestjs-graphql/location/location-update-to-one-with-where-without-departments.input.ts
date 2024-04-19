import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationUpdateWithoutDepartmentsInput } from './location-update-without-departments.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationUpdateToOneWithWhereWithoutDepartmentsInput {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => LocationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutDepartmentsInput)
  data!: LocationUpdateWithoutDepartmentsInput;
}
