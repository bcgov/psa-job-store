import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationUpdateInput } from './classification-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@ArgsType()
export class UpdateOneClassificationArgs {
  @Field(() => ClassificationUpdateInput, { nullable: false })
  @Type(() => ClassificationUpdateInput)
  data!: ClassificationUpdateInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
