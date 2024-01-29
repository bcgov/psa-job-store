import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileStreamLinkScalarWhereInput {
  @Field(() => [JobProfileStreamLinkScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileStreamLinkScalarWhereInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileStreamLinkScalarWhereInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileStreamLinkScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  jobProfileId?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  streamId?: IntFilter;
}
