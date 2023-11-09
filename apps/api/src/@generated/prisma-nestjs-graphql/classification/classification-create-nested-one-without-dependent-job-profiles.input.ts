import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutDependent_job_profilesInput } from './classification-create-without-dependent-job-profiles.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutDependent_job_profilesInput } from './classification-create-or-connect-without-dependent-job-profiles.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';

@InputType()
export class ClassificationCreateNestedOneWithoutDependent_job_profilesInput {
  @Field(() => ClassificationCreateWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutDependent_job_profilesInput)
  create?: ClassificationCreateWithoutDependent_job_profilesInput;

  @Field(() => ClassificationCreateOrConnectWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutDependent_job_profilesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutDependent_job_profilesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;
}
