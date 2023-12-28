import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutStreamInput } from './job-profile-update-without-stream.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutStreamInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutStreamInput)
  data!: JobProfileUpdateWithoutStreamInput;
}
