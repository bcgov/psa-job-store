import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutEmployee_groupInput } from './classification-create-without-employee-group.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateOrConnectWithoutEmployee_groupInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutEmployee_groupInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutEmployee_groupInput)
  create!: ClassificationCreateWithoutEmployee_groupInput;
}
