import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutContextInput } from './job-profile-update-without-context.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutContextInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutContextInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutContextInput)
  data!: JobProfileUpdateWithoutContextInput;
}
