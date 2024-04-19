import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@ArgsType()
export class DeleteManyJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;
}
