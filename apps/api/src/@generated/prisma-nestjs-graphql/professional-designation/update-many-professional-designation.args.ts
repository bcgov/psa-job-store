import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationUpdateManyMutationInput } from './professional-designation-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';

@ArgsType()
export class UpdateManyProfessionalDesignationArgs {
  @Field(() => ProfessionalDesignationUpdateManyMutationInput, { nullable: false })
  @Type(() => ProfessionalDesignationUpdateManyMutationInput)
  data!: ProfessionalDesignationUpdateManyMutationInput;

  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;
}
