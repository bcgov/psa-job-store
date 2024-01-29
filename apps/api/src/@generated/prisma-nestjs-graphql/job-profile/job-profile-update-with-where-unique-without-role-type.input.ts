import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutRole_typeInput } from './job-profile-update-without-role-type.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutRole_typeInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutRole_typeInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutRole_typeInput)
  data!: JobProfileUpdateWithoutRole_typeInput;
}
