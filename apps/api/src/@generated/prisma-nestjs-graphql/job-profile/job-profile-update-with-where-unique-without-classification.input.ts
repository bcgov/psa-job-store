import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutClassificationInput } from './job-profile-update-without-classification.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutClassificationInput)
  data!: JobProfileUpdateWithoutClassificationInput;
}
