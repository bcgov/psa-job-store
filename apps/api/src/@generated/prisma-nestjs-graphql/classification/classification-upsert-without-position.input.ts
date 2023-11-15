import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutPositionInput } from './classification-update-without-position.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionInput } from './classification-create-without-position.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutPositionInput {
  @Field(() => ClassificationUpdateWithoutPositionInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionInput)
  update!: ClassificationUpdateWithoutPositionInput;

  @Field(() => ClassificationCreateWithoutPositionInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionInput)
  create!: ClassificationCreateWithoutPositionInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
