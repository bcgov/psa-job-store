import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionRequestInput } from './classification-create-without-position-request.input';

@InputType()
export class ClassificationCreateOrConnectWithoutPositionRequestInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutPositionRequestInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionRequestInput)
  create!: ClassificationCreateWithoutPositionRequestInput;
}
