import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateManyScopeInput } from './job-profile-create-many-scope.input';

@InputType()
export class JobProfileCreateManyScopeInputEnvelope {
  @Field(() => [JobProfileCreateManyScopeInput], { nullable: false })
  @Type(() => JobProfileCreateManyScopeInput)
  data!: Array<JobProfileCreateManyScopeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
