import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutJob_profilesInput } from './classification-create-without-job-profiles.input';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateOrConnectWithoutJob_profilesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutJob_profilesInput)
  create!: ClassificationCreateWithoutJob_profilesInput;
}
