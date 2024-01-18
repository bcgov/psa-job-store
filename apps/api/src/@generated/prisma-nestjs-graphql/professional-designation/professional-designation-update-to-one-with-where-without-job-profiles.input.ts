import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationUpdateWithoutJob_profilesInput } from './professional-designation-update-without-job-profiles.input';

@InputType()
export class ProfessionalDesignationUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;

  @Field(() => ProfessionalDesignationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateWithoutJob_profilesInput)
  data!: ProfessionalDesignationUpdateWithoutJob_profilesInput;
}
