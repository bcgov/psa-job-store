import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutPositionsInput } from './classification-create-without-positions.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutPositionsInput } from './classification-create-or-connect-without-positions.input';
import { ClassificationUpsertWithoutPositionsInput } from './classification-upsert-without-positions.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutPositionsInput } from './classification-update-to-one-with-where-without-positions.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutPositionsNestedInput {
  @Field(() => ClassificationCreateWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutPositionsInput)
  create?: ClassificationCreateWithoutPositionsInput;

  @Field(() => ClassificationCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutPositionsInput;

  @Field(() => ClassificationUpsertWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutPositionsInput)
  upsert?: ClassificationUpsertWithoutPositionsInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutPositionsInput)
  update?: ClassificationUpdateToOneWithWhereWithoutPositionsInput;
}
