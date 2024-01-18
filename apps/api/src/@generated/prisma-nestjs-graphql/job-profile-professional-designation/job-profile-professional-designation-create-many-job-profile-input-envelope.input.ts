import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateManyJob_profileInput } from './job-profile-professional-designation-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileProfessionalDesignationCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateManyJob_profileInput)
  data!: Array<JobProfileProfessionalDesignationCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
