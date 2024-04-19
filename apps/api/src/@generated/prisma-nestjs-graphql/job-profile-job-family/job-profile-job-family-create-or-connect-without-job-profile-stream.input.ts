import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJobProfileStreamInput } from './job-profile-job-family-create-without-job-profile-stream.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@InputType()
export class JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput)
  create!: JobProfileJobFamilyCreateWithoutJobProfileStreamInput;
}
