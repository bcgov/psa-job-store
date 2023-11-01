import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCareerGroupArgs {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;
}
