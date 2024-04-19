import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateManyInput } from './job-profile-stream-create-many.input';

@ArgsType()
export class CreateManyJobProfileStreamArgs {
  @Field(() => [JobProfileStreamCreateManyInput], { nullable: false })
  @Type(() => JobProfileStreamCreateManyInput)
  data!: Array<JobProfileStreamCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
