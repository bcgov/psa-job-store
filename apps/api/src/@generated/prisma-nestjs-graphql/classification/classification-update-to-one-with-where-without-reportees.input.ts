import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutReporteesInput } from './classification-update-without-reportees.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutReporteesInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutReporteesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutReporteesInput)
  data!: ClassificationUpdateWithoutReporteesInput;
}
