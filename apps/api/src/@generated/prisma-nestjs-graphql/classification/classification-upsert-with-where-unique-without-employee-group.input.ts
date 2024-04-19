import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployee_groupInput } from './classification-create-without-employee-group.input';
import { ClassificationUpdateWithoutEmployee_groupInput } from './classification-update-without-employee-group.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationUpsertWithWhereUniqueWithoutEmployee_groupInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployee_groupInput)
  update!: ClassificationUpdateWithoutEmployee_groupInput;

  @Field(() => ClassificationCreateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployee_groupInput)
  create!: ClassificationCreateWithoutEmployee_groupInput;
}
