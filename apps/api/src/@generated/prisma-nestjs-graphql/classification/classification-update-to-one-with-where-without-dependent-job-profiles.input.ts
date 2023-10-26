import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationUpdateWithoutDependent_job_profilesInput } from './classification-update-without-dependent-job-profiles.input';

@InputType()
export class ClassificationUpdateToOneWithWhereWithoutDependent_job_profilesInput {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => ClassificationUpdateWithoutDependent_job_profilesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutDependent_job_profilesInput)
  data!: ClassificationUpdateWithoutDependent_job_profilesInput;
}
