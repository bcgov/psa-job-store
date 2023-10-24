import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';
import { MinistryCreateNestedOneWithoutJob_profilesInput } from '../ministry/ministry-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileCreateWithoutClassificationInput {
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

  @Field(() => MinistryCreateNestedOneWithoutJob_profilesInput, { nullable: true })
  ministry?: MinistryCreateNestedOneWithoutJob_profilesInput;
}
