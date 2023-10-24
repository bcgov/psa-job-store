import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutMinistryInput } from './job-profile-update-without-ministry.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutMinistryInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutMinistryInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutMinistryInput)
  data!: JobProfileUpdateWithoutMinistryInput;
}
