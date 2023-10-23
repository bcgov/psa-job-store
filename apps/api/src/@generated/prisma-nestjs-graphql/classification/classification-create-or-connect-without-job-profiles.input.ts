import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutJob_profilesInput } from './classification-create-without-job-profiles.input';

@InputType()
export class ClassificationCreateOrConnectWithoutJob_profilesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutJob_profilesInput)
  create!: ClassificationCreateWithoutJob_profilesInput;
}
