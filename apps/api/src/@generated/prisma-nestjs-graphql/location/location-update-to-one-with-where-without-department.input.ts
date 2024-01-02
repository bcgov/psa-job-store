import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationUpdateWithoutDepartmentInput } from './location-update-without-department.input';

@InputType()
export class LocationUpdateToOneWithWhereWithoutDepartmentInput {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => LocationUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => LocationUpdateWithoutDepartmentInput)
  data!: LocationUpdateWithoutDepartmentInput;
}
