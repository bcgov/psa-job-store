import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateInput } from './classification-create.input';
import { ClassificationUpdateInput } from './classification-update.input';

@ArgsType()
export class UpsertOneClassificationArgs {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateInput, { nullable: false })
  @Type(() => ClassificationCreateInput)
  create!: ClassificationCreateInput;

  @Field(() => ClassificationUpdateInput, { nullable: false })
  @Type(() => ClassificationUpdateInput)
  update!: ClassificationUpdateInput;
}
