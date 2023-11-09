import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridCreateWithoutClassificationsInput } from './grid-create-without-classifications.input';
import { Type } from 'class-transformer';
import { GridCreateOrConnectWithoutClassificationsInput } from './grid-create-or-connect-without-classifications.input';
import { GridUpsertWithoutClassificationsInput } from './grid-upsert-without-classifications.input';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { GridUpdateToOneWithWhereWithoutClassificationsInput } from './grid-update-to-one-with-where-without-classifications.input';

@InputType()
export class GridUpdateOneRequiredWithoutClassificationsNestedInput {
  @Field(() => GridCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => GridCreateWithoutClassificationsInput)
  create?: GridCreateWithoutClassificationsInput;

  @Field(() => GridCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => GridCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: GridCreateOrConnectWithoutClassificationsInput;

  @Field(() => GridUpsertWithoutClassificationsInput, { nullable: true })
  @Type(() => GridUpsertWithoutClassificationsInput)
  upsert?: GridUpsertWithoutClassificationsInput;

  @Field(() => GridWhereUniqueInput, { nullable: true })
  @Type(() => GridWhereUniqueInput)
  connect?: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;

  @Field(() => GridUpdateToOneWithWhereWithoutClassificationsInput, { nullable: true })
  @Type(() => GridUpdateToOneWithWhereWithoutClassificationsInput)
  update?: GridUpdateToOneWithWhereWithoutClassificationsInput;
}
