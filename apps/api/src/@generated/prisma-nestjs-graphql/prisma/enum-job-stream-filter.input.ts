import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from './job-stream.enum';

@InputType()
export class EnumJobStreamFilter {
  @Field(() => JobStream, { nullable: true })
  equals?: keyof typeof JobStream;

  @Field(() => [JobStream], { nullable: true })
  in?: Array<keyof typeof JobStream>;

  @Field(() => [JobStream], { nullable: true })
  notIn?: Array<keyof typeof JobStream>;

  @Field(() => EnumJobStreamFilter, { nullable: true })
  not?: EnumJobStreamFilter;
}
