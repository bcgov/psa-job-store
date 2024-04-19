import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutPosition_requestInput } from './job-profile-create-without-position-request.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateOrConnectWithoutPosition_requestInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutPosition_requestInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutPosition_requestInput)
  create!: JobProfileCreateWithoutPosition_requestInput;
}
