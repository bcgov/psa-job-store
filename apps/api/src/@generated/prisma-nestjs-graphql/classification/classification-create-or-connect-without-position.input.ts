import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionInput } from './classification-create-without-position.input';

@InputType()
export class ClassificationCreateOrConnectWithoutPositionInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutPositionInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionInput)
  create!: ClassificationCreateWithoutPositionInput;
}
