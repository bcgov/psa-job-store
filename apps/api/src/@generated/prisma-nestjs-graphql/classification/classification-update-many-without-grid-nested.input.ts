import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutGridInput } from './classification-create-without-grid.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutGridInput } from './classification-create-or-connect-without-grid.input';
import { ClassificationUpsertWithWhereUniqueWithoutGridInput } from './classification-upsert-with-where-unique-without-grid.input';
import { ClassificationCreateManyGridInputEnvelope } from './classification-create-many-grid-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateWithWhereUniqueWithoutGridInput } from './classification-update-with-where-unique-without-grid.input';
import { ClassificationUpdateManyWithWhereWithoutGridInput } from './classification-update-many-with-where-without-grid.input';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';

@InputType()
export class ClassificationUpdateManyWithoutGridNestedInput {
  @Field(() => [ClassificationCreateWithoutGridInput], { nullable: true })
  @Type(() => ClassificationCreateWithoutGridInput)
  create?: Array<ClassificationCreateWithoutGridInput>;

  @Field(() => [ClassificationCreateOrConnectWithoutGridInput], { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutGridInput)
  connectOrCreate?: Array<ClassificationCreateOrConnectWithoutGridInput>;

  @Field(() => [ClassificationUpsertWithWhereUniqueWithoutGridInput], { nullable: true })
  @Type(() => ClassificationUpsertWithWhereUniqueWithoutGridInput)
  upsert?: Array<ClassificationUpsertWithWhereUniqueWithoutGridInput>;

  @Field(() => ClassificationCreateManyGridInputEnvelope, { nullable: true })
  @Type(() => ClassificationCreateManyGridInputEnvelope)
  createMany?: ClassificationCreateManyGridInputEnvelope;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;

  @Field(() => [ClassificationUpdateWithWhereUniqueWithoutGridInput], { nullable: true })
  @Type(() => ClassificationUpdateWithWhereUniqueWithoutGridInput)
  update?: Array<ClassificationUpdateWithWhereUniqueWithoutGridInput>;

  @Field(() => [ClassificationUpdateManyWithWhereWithoutGridInput], { nullable: true })
  @Type(() => ClassificationUpdateManyWithWhereWithoutGridInput)
  updateMany?: Array<ClassificationUpdateManyWithWhereWithoutGridInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  @Type(() => ClassificationScalarWhereInput)
  deleteMany?: Array<ClassificationScalarWhereInput>;
}
