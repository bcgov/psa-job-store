import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutStreamsInput } from './job-profile-update-without-streams.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutStreamsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutStreamsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutStreamsInput)
  data!: JobProfileUpdateWithoutStreamsInput;
}
