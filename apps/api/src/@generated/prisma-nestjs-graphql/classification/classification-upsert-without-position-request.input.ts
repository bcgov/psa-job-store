import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutPositionRequestInput } from './classification-update-without-position-request.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionRequestInput } from './classification-create-without-position-request.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutPositionRequestInput {
  @Field(() => ClassificationUpdateWithoutPositionRequestInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionRequestInput)
  update!: ClassificationUpdateWithoutPositionRequestInput;

  @Field(() => ClassificationCreateWithoutPositionRequestInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionRequestInput)
  create!: ClassificationCreateWithoutPositionRequestInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
