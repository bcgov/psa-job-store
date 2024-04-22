import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput } from './job-profile-job-family-create-or-connect-without-job-profile-stream.input';
import { JobProfileJobFamilyCreateWithoutJobProfileStreamInput } from './job-profile-job-family-create-without-job-profile-stream.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@InputType()
export class JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput {
  @Field(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput)
  create?: JobProfileJobFamilyCreateWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput)
  connectOrCreate?: JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;
}
