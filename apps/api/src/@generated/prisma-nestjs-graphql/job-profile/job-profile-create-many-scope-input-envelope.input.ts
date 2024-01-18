import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyScopeInput } from './job-profile-create-many-scope.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyScopeInputEnvelope {
  @Field(() => [JobProfileCreateManyScopeInput], { nullable: false })
  @Type(() => JobProfileCreateManyScopeInput)
  data!: Array<JobProfileCreateManyScopeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
