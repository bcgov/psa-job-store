import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutScopeInput } from './job-profile-update-without-scope.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutScopeInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutScopeInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutScopeInput)
  data!: JobProfileUpdateWithoutScopeInput;
}
