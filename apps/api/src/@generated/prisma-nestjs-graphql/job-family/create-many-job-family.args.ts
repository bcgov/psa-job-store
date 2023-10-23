import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyCreateManyInput } from './job-family-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobFamilyArgs {
  @Field(() => [JobFamilyCreateManyInput], { nullable: false })
  @Type(() => JobFamilyCreateManyInput)
  data!: Array<JobFamilyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
