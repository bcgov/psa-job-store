import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutRoleInput } from './job-profile-update-without-role.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutRoleInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutRoleInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutRoleInput)
  data!: JobProfileUpdateWithoutRoleInput;
}
