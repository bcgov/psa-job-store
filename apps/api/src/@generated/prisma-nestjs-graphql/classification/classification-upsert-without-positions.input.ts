import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutPositionsInput } from './classification-update-without-positions.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutPositionsInput } from './classification-create-without-positions.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutPositionsInput {
  @Field(() => ClassificationUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutPositionsInput)
  update!: ClassificationUpdateWithoutPositionsInput;

  @Field(() => ClassificationCreateWithoutPositionsInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutPositionsInput)
  create!: ClassificationCreateWithoutPositionsInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
