import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileJobFamilyLinkScalarWhereInput {
  @Field(() => [JobProfileJobFamilyLinkScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyLinkScalarWhereInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyLinkScalarWhereInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyLinkScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  jobProfileId?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  jobFamilyId?: IntFilter;
}
