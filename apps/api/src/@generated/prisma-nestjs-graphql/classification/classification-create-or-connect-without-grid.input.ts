import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutGridInput } from './classification-create-without-grid.input';

@InputType()
export class ClassificationCreateOrConnectWithoutGridInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutGridInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutGridInput)
  create!: ClassificationCreateWithoutGridInput;
}
