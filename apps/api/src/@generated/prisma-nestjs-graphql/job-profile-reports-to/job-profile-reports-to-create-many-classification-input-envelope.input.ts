import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateManyClassificationInput } from './job-profile-reports-to-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileReportsToCreateManyClassificationInputEnvelope {
  @Field(() => [JobProfileReportsToCreateManyClassificationInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyClassificationInput)
  data!: Array<JobProfileReportsToCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
