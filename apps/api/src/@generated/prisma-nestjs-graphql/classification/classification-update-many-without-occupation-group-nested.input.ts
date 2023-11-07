import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutOccupation_groupInput } from './classification-create-without-occupation-group.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutOccupation_groupInput } from './classification-create-or-connect-without-occupation-group.input';
import { ClassificationUpsertWithWhereUniqueWithoutOccupation_groupInput } from './classification-upsert-with-where-unique-without-occupation-group.input';
import { ClassificationCreateManyOccupation_groupInputEnvelope } from './classification-create-many-occupation-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateWithWhereUniqueWithoutOccupation_groupInput } from './classification-update-with-where-unique-without-occupation-group.input';
import { ClassificationUpdateManyWithWhereWithoutOccupation_groupInput } from './classification-update-many-with-where-without-occupation-group.input';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';

@InputType()
export class ClassificationUpdateManyWithoutOccupation_groupNestedInput {
  @Field(() => [ClassificationCreateWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationCreateWithoutOccupation_groupInput)
  create?: Array<ClassificationCreateWithoutOccupation_groupInput>;

  @Field(() => [ClassificationCreateOrConnectWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutOccupation_groupInput)
  connectOrCreate?: Array<ClassificationCreateOrConnectWithoutOccupation_groupInput>;

  @Field(() => [ClassificationUpsertWithWhereUniqueWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationUpsertWithWhereUniqueWithoutOccupation_groupInput)
  upsert?: Array<ClassificationUpsertWithWhereUniqueWithoutOccupation_groupInput>;

  @Field(() => ClassificationCreateManyOccupation_groupInputEnvelope, { nullable: true })
  @Type(() => ClassificationCreateManyOccupation_groupInputEnvelope)
  createMany?: ClassificationCreateManyOccupation_groupInputEnvelope;

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

  @Field(() => [ClassificationUpdateWithWhereUniqueWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationUpdateWithWhereUniqueWithoutOccupation_groupInput)
  update?: Array<ClassificationUpdateWithWhereUniqueWithoutOccupation_groupInput>;

  @Field(() => [ClassificationUpdateManyWithWhereWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationUpdateManyWithWhereWithoutOccupation_groupInput)
  updateMany?: Array<ClassificationUpdateManyWithWhereWithoutOccupation_groupInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  @Type(() => ClassificationScalarWhereInput)
  deleteMany?: Array<ClassificationScalarWhereInput>;
}
