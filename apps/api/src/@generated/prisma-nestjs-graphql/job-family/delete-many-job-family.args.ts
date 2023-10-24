import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobFamilyArgs {
  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;
}
