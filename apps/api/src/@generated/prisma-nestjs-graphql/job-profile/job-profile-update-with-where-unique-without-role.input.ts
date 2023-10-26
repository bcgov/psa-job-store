import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutRoleInput } from './job-profile-update-without-role.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutRoleInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutRoleInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutRoleInput)
  data!: JobProfileUpdateWithoutRoleInput;
}
