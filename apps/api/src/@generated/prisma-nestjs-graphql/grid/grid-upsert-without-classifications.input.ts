import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridUpdateWithoutClassificationsInput } from './grid-update-without-classifications.input';
import { Type } from 'class-transformer';
import { GridCreateWithoutClassificationsInput } from './grid-create-without-classifications.input';
import { GridWhereInput } from './grid-where.input';

@InputType()
export class GridUpsertWithoutClassificationsInput {
  @Field(() => GridUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => GridUpdateWithoutClassificationsInput)
  update!: GridUpdateWithoutClassificationsInput;

  @Field(() => GridCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => GridCreateWithoutClassificationsInput)
  create!: GridCreateWithoutClassificationsInput;

  @Field(() => GridWhereInput, { nullable: true })
  @Type(() => GridWhereInput)
  where?: GridWhereInput;
}
