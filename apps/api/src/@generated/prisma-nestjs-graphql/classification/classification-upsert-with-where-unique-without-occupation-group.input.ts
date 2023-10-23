import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutOccupation_groupInput } from './classification-update-without-occupation-group.input';
import { ClassificationCreateWithoutOccupation_groupInput } from './classification-create-without-occupation-group.input';

@InputType()
export class ClassificationUpsertWithWhereUniqueWithoutOccupation_groupInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateWithoutOccupation_groupInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutOccupation_groupInput)
  update!: ClassificationUpdateWithoutOccupation_groupInput;

  @Field(() => ClassificationCreateWithoutOccupation_groupInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutOccupation_groupInput)
  create!: ClassificationCreateWithoutOccupation_groupInput;
}
