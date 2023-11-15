import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutPositionInput } from './classification-create-without-position.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutPositionInput } from './classification-create-or-connect-without-position.input';
import { ClassificationUpsertWithoutPositionInput } from './classification-upsert-without-position.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutPositionInput } from './classification-update-to-one-with-where-without-position.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutPositionNestedInput {
  @Field(() => ClassificationCreateWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutPositionInput)
  create?: ClassificationCreateWithoutPositionInput;

  @Field(() => ClassificationCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutPositionInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutPositionInput;

  @Field(() => ClassificationUpsertWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutPositionInput)
  upsert?: ClassificationUpsertWithoutPositionInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutPositionInput)
  update?: ClassificationUpdateToOneWithWhereWithoutPositionInput;
}
