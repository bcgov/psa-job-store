import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutPositionRequestInput } from './classification-create-without-position-request.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutPositionRequestInput } from './classification-create-or-connect-without-position-request.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutPositionRequestInput {
  @Field(() => ClassificationCreateWithoutPositionRequestInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutPositionRequestInput)
  create?: ClassificationCreateWithoutPositionRequestInput;

  @Field(() => ClassificationCreateOrConnectWithoutPositionRequestInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutPositionRequestInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutPositionRequestInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
