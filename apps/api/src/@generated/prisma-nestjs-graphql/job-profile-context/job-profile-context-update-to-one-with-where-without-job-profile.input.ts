import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextUpdateWithoutJob_profileInput } from './job-profile-context-update-without-job-profile.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@InputType()
export class JobProfileContextUpdateToOneWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;

  @Field(() => JobProfileContextUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileContextUpdateWithoutJob_profileInput)
  data!: JobProfileContextUpdateWithoutJob_profileInput;
}
