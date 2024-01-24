import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyLinkWhereInput)
  where?: JobProfileJobFamilyLinkWhereInput;
}
