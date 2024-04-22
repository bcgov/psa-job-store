import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateManyInput } from './job-profile-create-many.input';

@ArgsType()
export class CreateManyJobProfileArgs {
  @Field(() => [JobProfileCreateManyInput], { nullable: false })
  @Type(() => JobProfileCreateManyInput)
  data!: Array<JobProfileCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
