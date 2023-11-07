import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutDependent_job_profilesInput } from './classification-create-without-dependent-job-profiles.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutDependent_job_profilesInput } from './classification-create-or-connect-without-dependent-job-profiles.input';
import { ClassificationUpsertWithoutDependent_job_profilesInput } from './classification-upsert-without-dependent-job-profiles.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutDependent_job_profilesInput } from './classification-update-to-one-with-where-without-dependent-job-profiles.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput {
  @Field(() => ClassificationCreateWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutDependent_job_profilesInput)
  create?: ClassificationCreateWithoutDependent_job_profilesInput;

  @Field(() => ClassificationCreateOrConnectWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutDependent_job_profilesInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutDependent_job_profilesInput;

  @Field(() => ClassificationUpsertWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutDependent_job_profilesInput)
  upsert?: ClassificationUpsertWithoutDependent_job_profilesInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutDependent_job_profilesInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutDependent_job_profilesInput)
  update?: ClassificationUpdateToOneWithWhereWithoutDependent_job_profilesInput;
}
