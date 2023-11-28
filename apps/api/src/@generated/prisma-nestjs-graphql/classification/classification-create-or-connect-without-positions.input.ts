import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionsInput } from './classification-create-without-positions.input';

@InputType()
export class ClassificationCreateOrConnectWithoutPositionsInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutPositionsInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionsInput)
  create!: ClassificationCreateWithoutPositionsInput;
}
