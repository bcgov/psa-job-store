import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutRole_typeInput } from './job-profile-create-without-role-type.input';

@InputType()
export class JobProfileCreateOrConnectWithoutRole_typeInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutRole_typeInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutRole_typeInput)
  create!: JobProfileCreateWithoutRole_typeInput;
}
