import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationUpdateWithoutJob_profilesInput } from './professional-designation-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateWithoutJob_profilesInput } from './professional-designation-create-without-job-profiles.input';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';

@InputType()
export class ProfessionalDesignationUpsertWithoutJob_profilesInput {
  @Field(() => ProfessionalDesignationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateWithoutJob_profilesInput)
  update!: ProfessionalDesignationUpdateWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ProfessionalDesignationCreateWithoutJob_profilesInput)
  create!: ProfessionalDesignationCreateWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;
}
