import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutParentInput } from './job-profile-update-without-parent.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutParentInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutParentInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutParentInput)
  data!: JobProfileUpdateWithoutParentInput;
}
