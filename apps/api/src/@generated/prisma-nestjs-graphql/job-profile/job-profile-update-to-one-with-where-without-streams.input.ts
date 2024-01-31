import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutStreamsInput } from './job-profile-update-without-streams.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutStreamsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutStreamsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutStreamsInput)
  data!: JobProfileUpdateWithoutStreamsInput;
}
