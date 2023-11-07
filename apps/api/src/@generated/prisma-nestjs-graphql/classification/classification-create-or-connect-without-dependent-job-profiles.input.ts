import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutDependent_job_profilesInput } from './classification-create-without-dependent-job-profiles.input';

@InputType()
export class ClassificationCreateOrConnectWithoutDependent_job_profilesInput {
  @Field(() => ClassificationWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationCreateWithoutDependent_job_profilesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutDependent_job_profilesInput)
  create!: ClassificationCreateWithoutDependent_job_profilesInput;
}
