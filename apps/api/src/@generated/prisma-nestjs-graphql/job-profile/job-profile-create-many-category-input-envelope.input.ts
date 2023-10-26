import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyCategoryInput } from './job-profile-create-many-category.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyCategoryInputEnvelope {
  @Field(() => [JobProfileCreateManyCategoryInput], { nullable: false })
  @Type(() => JobProfileCreateManyCategoryInput)
  data!: Array<JobProfileCreateManyCategoryInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
