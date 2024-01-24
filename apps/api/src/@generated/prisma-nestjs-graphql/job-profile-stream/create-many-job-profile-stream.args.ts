import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamCreateManyInput } from './job-profile-stream-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileStreamArgs {
  @Field(() => [JobProfileStreamCreateManyInput], { nullable: false })
  @Type(() => JobProfileStreamCreateManyInput)
  data!: Array<JobProfileStreamCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
