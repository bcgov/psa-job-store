import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateManyClassificationInput } from './job-profile-reports-to-create-many-classification.input';

@InputType()
export class JobProfileReportsToCreateManyClassificationInputEnvelope {
  @Field(() => [JobProfileReportsToCreateManyClassificationInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyClassificationInput)
  data!: Array<JobProfileReportsToCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
