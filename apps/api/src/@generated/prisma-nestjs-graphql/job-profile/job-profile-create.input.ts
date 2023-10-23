import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutJob_profilesInput } from '../classification/classification-create-nested-one-without-job-profiles.input';
import { MinistryCreateNestedOneWithoutJob_profilesInput } from '../ministry/ministry-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileCreateInput {
  @Field(() => JobStream, { nullable: false })
  stream!: keyof typeof JobStream;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => String, { nullable: false })
  context!: string;

  @Field(() => String, { nullable: false })
  overview!: string;

  @Field(() => ClassificationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutJob_profilesInput;

  @Field(() => MinistryCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  ministry?: MinistryCreateNestedOneWithoutJob_profilesInput;
}
