import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupCreateManyInput } from './career-group-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCareerGroupArgs {
  @Field(() => [CareerGroupCreateManyInput], { nullable: false })
  @Type(() => CareerGroupCreateManyInput)
  data!: Array<CareerGroupCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
