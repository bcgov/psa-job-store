import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyCreateInput } from './job-family-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobFamilyArgs {
  @Field(() => JobFamilyCreateInput, { nullable: false })
  @Type(() => JobFamilyCreateInput)
  data!: JobFamilyCreateInput;
}
