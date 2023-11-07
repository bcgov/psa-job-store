import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutDependent_job_profilesInput } from './classification-update-without-dependent-job-profiles.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutDependent_job_profilesInput } from './classification-create-without-dependent-job-profiles.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutDependent_job_profilesInput {
  @Field(() => ClassificationUpdateWithoutDependent_job_profilesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutDependent_job_profilesInput)
  update!: ClassificationUpdateWithoutDependent_job_profilesInput;

  @Field(() => ClassificationCreateWithoutDependent_job_profilesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutDependent_job_profilesInput)
  create!: ClassificationCreateWithoutDependent_job_profilesInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
