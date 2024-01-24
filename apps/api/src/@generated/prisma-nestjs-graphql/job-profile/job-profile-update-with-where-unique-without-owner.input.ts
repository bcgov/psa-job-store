import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOwnerInput } from './job-profile-update-without-owner.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutOwnerInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOwnerInput)
  data!: JobProfileUpdateWithoutOwnerInput;
}
