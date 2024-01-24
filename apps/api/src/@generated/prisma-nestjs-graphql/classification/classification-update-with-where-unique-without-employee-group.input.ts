import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutEmployee_groupInput } from './classification-update-without-employee-group.input';

@InputType()
export class ClassificationUpdateWithWhereUniqueWithoutEmployee_groupInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutEmployee_groupInput)
  data!: ClassificationUpdateWithoutEmployee_groupInput;
}
