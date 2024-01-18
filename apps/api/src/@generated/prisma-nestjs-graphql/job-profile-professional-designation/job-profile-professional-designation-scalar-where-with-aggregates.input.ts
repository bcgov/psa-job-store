import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileProfessionalDesignationScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileProfessionalDesignationScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  professional_designation_id?: IntWithAggregatesFilter;
}
