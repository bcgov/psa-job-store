import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateManyInput } from './job-profile-professional-designation-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileProfessionalDesignationArgs {
  @Field(() => [JobProfileProfessionalDesignationCreateManyInput], { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateManyInput)
  data!: Array<JobProfileProfessionalDesignationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
