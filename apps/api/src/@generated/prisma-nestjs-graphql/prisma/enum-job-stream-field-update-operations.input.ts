import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobStream } from './job-stream.enum';

@InputType()
export class EnumJobStreamFieldUpdateOperationsInput {
  @Field(() => JobStream, { nullable: true })
  set?: keyof typeof JobStream;
}
