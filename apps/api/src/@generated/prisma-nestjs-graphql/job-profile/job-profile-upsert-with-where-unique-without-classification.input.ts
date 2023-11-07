import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutClassificationInput } from './job-profile-update-without-classification.input';
import { JobProfileCreateWithoutClassificationInput } from './job-profile-create-without-classification.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutClassificationInput)
  update!: JobProfileUpdateWithoutClassificationInput;

  @Field(() => JobProfileCreateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutClassificationInput)
  create!: JobProfileCreateWithoutClassificationInput;
}
