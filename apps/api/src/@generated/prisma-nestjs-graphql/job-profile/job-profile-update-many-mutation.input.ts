import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileUpdateManyMutationInput {
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
}
