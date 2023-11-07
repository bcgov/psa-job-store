import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupCreateInput } from './career-group-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCareerGroupArgs {
  @Field(() => CareerGroupCreateInput, { nullable: false })
  @Type(() => CareerGroupCreateInput)
  data!: CareerGroupCreateInput;
}
