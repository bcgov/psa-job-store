import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutPositionInput } from './classification-create-without-position.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutPositionInput } from './classification-create-or-connect-without-position.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutPositionInput {
  @Field(() => ClassificationCreateWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutPositionInput)
  create?: ClassificationCreateWithoutPositionInput;

  @Field(() => ClassificationCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutPositionInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutPositionInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
