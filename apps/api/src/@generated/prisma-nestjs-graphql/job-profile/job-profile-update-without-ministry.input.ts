import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../classification/classification-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileUpdateWithoutMinistryInput {
  @Field(() => JobStream, { nullable: true })
  stream?: keyof typeof JobStream;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  number?: number;

  @Field(() => String, { nullable: true })
  context?: string;

  @Field(() => String, { nullable: true })
  overview?: string;

  @Field(() => ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput;
}
