import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutClassificationsInput } from './job-profile-create-without-classifications.input';

@InputType()
export class JobProfileCreateOrConnectWithoutClassificationsInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutClassificationsInput)
  create!: JobProfileCreateWithoutClassificationsInput;
}
