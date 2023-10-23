import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobStream } from '../prisma/job-stream.enum';
import { Classification } from '../classification/classification.model';
import { Ministry } from '../ministry/ministry.model';

@ObjectType()
export class JobProfile {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: true })
  ministry_id!: number | null;

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

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => Ministry, { nullable: true })
  ministry?: Ministry | null;
}
