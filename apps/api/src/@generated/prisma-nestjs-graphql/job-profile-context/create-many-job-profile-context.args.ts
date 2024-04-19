import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextCreateManyInput } from './job-profile-context-create-many.input';

@ArgsType()
export class CreateManyJobProfileContextArgs {
  @Field(() => [JobProfileContextCreateManyInput], { nullable: false })
  @Type(() => JobProfileContextCreateManyInput)
  data!: Array<JobProfileContextCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
