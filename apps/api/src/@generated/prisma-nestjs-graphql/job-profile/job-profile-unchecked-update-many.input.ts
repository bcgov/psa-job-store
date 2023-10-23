import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';

@InputType()
export class JobProfileUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  classification_id?: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

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
