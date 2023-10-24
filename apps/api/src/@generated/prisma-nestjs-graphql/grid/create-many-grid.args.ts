import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridCreateManyInput } from './grid-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyGridArgs {
  @Field(() => [GridCreateManyInput], { nullable: false })
  @Type(() => GridCreateManyInput)
  data!: Array<GridCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
