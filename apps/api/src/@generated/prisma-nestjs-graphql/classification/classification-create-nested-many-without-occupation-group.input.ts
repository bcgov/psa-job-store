import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutOccupation_groupInput } from './classification-create-without-occupation-group.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutOccupation_groupInput } from './classification-create-or-connect-without-occupation-group.input';
import { ClassificationCreateManyOccupation_groupInputEnvelope } from './classification-create-many-occupation-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedManyWithoutOccupation_groupInput {
  @Field(() => [ClassificationCreateWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationCreateWithoutOccupation_groupInput)
  create?: Array<ClassificationCreateWithoutOccupation_groupInput>;

  @Field(() => [ClassificationCreateOrConnectWithoutOccupation_groupInput], { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutOccupation_groupInput)
  connectOrCreate?: Array<ClassificationCreateOrConnectWithoutOccupation_groupInput>;

  @Field(() => ClassificationCreateManyOccupation_groupInputEnvelope, { nullable: true })
  @Type(() => ClassificationCreateManyOccupation_groupInputEnvelope)
  createMany?: ClassificationCreateManyOccupation_groupInputEnvelope;

  @Field(() => [ClassificationWhereUniqueInput], { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>>;
}
