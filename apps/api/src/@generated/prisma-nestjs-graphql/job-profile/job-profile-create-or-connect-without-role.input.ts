import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutRoleInput } from './job-profile-create-without-role.input';

@InputType()
export class JobProfileCreateOrConnectWithoutRoleInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutRoleInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutRoleInput)
  create!: JobProfileCreateWithoutRoleInput;
}
