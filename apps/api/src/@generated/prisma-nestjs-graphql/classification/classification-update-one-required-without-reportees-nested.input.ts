import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutReporteesInput } from './classification-create-without-reportees.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutReporteesInput } from './classification-create-or-connect-without-reportees.input';
import { ClassificationUpsertWithoutReporteesInput } from './classification-upsert-without-reportees.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutReporteesInput } from './classification-update-to-one-with-where-without-reportees.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutReporteesNestedInput {
  @Field(() => ClassificationCreateWithoutReporteesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutReporteesInput)
  create?: ClassificationCreateWithoutReporteesInput;

  @Field(() => ClassificationCreateOrConnectWithoutReporteesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutReporteesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutReporteesInput;

  @Field(() => ClassificationUpsertWithoutReporteesInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutReporteesInput)
  upsert?: ClassificationUpsertWithoutReporteesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutReporteesInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutReporteesInput)
  update?: ClassificationUpdateToOneWithWhereWithoutReporteesInput;
}
