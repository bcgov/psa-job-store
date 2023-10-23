import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutGridInput } from './classification-update-without-grid.input';

@InputType()
export class ClassificationUpdateWithWhereUniqueWithoutGridInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateWithoutGridInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutGridInput)
  data!: ClassificationUpdateWithoutGridInput;
}
