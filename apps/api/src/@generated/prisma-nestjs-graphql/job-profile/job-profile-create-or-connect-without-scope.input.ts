import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutScopeInput } from './job-profile-create-without-scope.input';

@InputType()
export class JobProfileCreateOrConnectWithoutScopeInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutScopeInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutScopeInput)
  create!: JobProfileCreateWithoutScopeInput;
}
