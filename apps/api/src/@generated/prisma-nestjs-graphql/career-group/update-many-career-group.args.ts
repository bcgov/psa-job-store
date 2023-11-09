import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupUpdateManyMutationInput } from './career-group-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CareerGroupWhereInput } from './career-group-where.input';

@ArgsType()
export class UpdateManyCareerGroupArgs {
  @Field(() => CareerGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => CareerGroupUpdateManyMutationInput)
  data!: CareerGroupUpdateManyMutationInput;

  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;
}
