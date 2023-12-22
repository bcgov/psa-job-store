import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutReporteesInput } from './classification-update-without-reportees.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutReporteesInput } from './classification-create-without-reportees.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutReporteesInput {
  @Field(() => ClassificationUpdateWithoutReporteesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutReporteesInput)
  update!: ClassificationUpdateWithoutReporteesInput;

  @Field(() => ClassificationCreateWithoutReporteesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutReporteesInput)
  create!: ClassificationCreateWithoutReporteesInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
