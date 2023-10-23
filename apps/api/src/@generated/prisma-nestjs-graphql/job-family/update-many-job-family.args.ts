import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyUpdateManyMutationInput } from './job-family-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobFamilyWhereInput } from './job-family-where.input';

@ArgsType()
export class UpdateManyJobFamilyArgs {
  @Field(() => JobFamilyUpdateManyMutationInput, { nullable: false })
  @Type(() => JobFamilyUpdateManyMutationInput)
  data!: JobFamilyUpdateManyMutationInput;

  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;
}
