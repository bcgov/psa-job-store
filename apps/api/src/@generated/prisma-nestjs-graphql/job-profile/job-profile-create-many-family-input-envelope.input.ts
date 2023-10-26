import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyFamilyInput } from './job-profile-create-many-family.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyFamilyInputEnvelope {
  @Field(() => [JobProfileCreateManyFamilyInput], { nullable: false })
  @Type(() => JobProfileCreateManyFamilyInput)
  data!: Array<JobProfileCreateManyFamilyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
