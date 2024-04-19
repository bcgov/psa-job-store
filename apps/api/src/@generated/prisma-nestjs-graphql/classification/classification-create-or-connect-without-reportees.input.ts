import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutReporteesInput } from './classification-create-without-reportees.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateOrConnectWithoutReporteesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutReporteesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutReporteesInput)
  create!: ClassificationCreateWithoutReporteesInput;
}
