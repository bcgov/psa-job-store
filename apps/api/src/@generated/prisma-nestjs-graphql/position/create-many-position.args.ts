import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionCreateManyInput } from './position-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyPositionArgs {
  @Field(() => [PositionCreateManyInput], { nullable: false })
  @Type(() => PositionCreateManyInput)
  data!: Array<PositionCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
