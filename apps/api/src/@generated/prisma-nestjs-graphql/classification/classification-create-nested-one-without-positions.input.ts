import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutPositionsInput } from './classification-create-without-positions.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutPositionsInput } from './classification-create-or-connect-without-positions.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutPositionsInput {
  @Field(() => ClassificationCreateWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutPositionsInput)
  create?: ClassificationCreateWithoutPositionsInput;

  @Field(() => ClassificationCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutPositionsInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
