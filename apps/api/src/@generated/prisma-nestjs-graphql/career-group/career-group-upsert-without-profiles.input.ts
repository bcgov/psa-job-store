import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupUpdateWithoutProfilesInput } from './career-group-update-without-profiles.input';
import { Type } from 'class-transformer';
import { CareerGroupCreateWithoutProfilesInput } from './career-group-create-without-profiles.input';
import { CareerGroupWhereInput } from './career-group-where.input';

@InputType()
export class CareerGroupUpsertWithoutProfilesInput {
  @Field(() => CareerGroupUpdateWithoutProfilesInput, { nullable: false })
  @Type(() => CareerGroupUpdateWithoutProfilesInput)
  update!: CareerGroupUpdateWithoutProfilesInput;

  @Field(() => CareerGroupCreateWithoutProfilesInput, { nullable: false })
  @Type(() => CareerGroupCreateWithoutProfilesInput)
  create!: CareerGroupCreateWithoutProfilesInput;

  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;
}
