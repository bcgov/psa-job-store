import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationScalarWhereInput } from './professional-designation-scalar-where.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationUpdateManyMutationInput } from './professional-designation-update-many-mutation.input';

@InputType()
export class ProfessionalDesignationUpdateManyWithWhereWithoutEmployee_groupInput {
  @Field(() => ProfessionalDesignationScalarWhereInput, { nullable: false })
  @Type(() => ProfessionalDesignationScalarWhereInput)
  where!: ProfessionalDesignationScalarWhereInput;

  @Field(() => ProfessionalDesignationUpdateManyMutationInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateManyMutationInput)
  data!: ProfessionalDesignationUpdateManyMutationInput;
}
