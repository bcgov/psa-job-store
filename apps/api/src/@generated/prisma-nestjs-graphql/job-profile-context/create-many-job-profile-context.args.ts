import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextCreateManyInput } from './job-profile-context-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileContextArgs {
  @Field(() => [JobProfileContextCreateManyInput], { nullable: false })
  @Type(() => JobProfileContextCreateManyInput)
  data!: Array<JobProfileContextCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
