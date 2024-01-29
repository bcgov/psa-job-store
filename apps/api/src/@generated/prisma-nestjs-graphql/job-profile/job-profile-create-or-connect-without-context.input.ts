import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutContextInput } from './job-profile-create-without-context.input';

@InputType()
export class JobProfileCreateOrConnectWithoutContextInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutContextInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutContextInput)
  create!: JobProfileCreateWithoutContextInput;
}
