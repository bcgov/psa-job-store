import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutOccupation_groupInput } from './classification-update-without-occupation-group.input';

@InputType()
export class ClassificationUpdateWithWhereUniqueWithoutOccupation_groupInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateWithoutOccupation_groupInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutOccupation_groupInput)
  data!: ClassificationUpdateWithoutOccupation_groupInput;
}
