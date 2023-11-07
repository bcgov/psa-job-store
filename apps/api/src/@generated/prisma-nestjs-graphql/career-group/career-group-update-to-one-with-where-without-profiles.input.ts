import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Type } from 'class-transformer';
import { CareerGroupUpdateWithoutProfilesInput } from './career-group-update-without-profiles.input';

@InputType()
export class CareerGroupUpdateToOneWithWhereWithoutProfilesInput {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;

  @Field(() => CareerGroupUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => CareerGroupUpdateWithoutProfilesInput)
  data!: CareerGroupUpdateWithoutProfilesInput;
}
