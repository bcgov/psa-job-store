import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutReporteesInput } from './classification-create-without-reportees.input';

@InputType()
export class ClassificationCreateOrConnectWithoutReporteesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutReporteesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutReporteesInput)
  create!: ClassificationCreateWithoutReporteesInput;
}
