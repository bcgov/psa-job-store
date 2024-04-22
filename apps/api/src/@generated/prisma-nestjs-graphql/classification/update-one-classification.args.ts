import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationUpdateInput } from './classification-update.input';
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
