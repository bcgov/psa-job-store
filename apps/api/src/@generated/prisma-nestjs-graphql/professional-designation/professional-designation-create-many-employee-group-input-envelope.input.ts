import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateManyEmployee_groupInput } from './professional-designation-create-many-employee-group.input';
import { Type } from 'class-transformer';

@InputType()
export class ProfessionalDesignationCreateManyEmployee_groupInputEnvelope {
  @Field(() => [ProfessionalDesignationCreateManyEmployee_groupInput], { nullable: false })
  @Type(() => ProfessionalDesignationCreateManyEmployee_groupInput)
  data!: Array<ProfessionalDesignationCreateManyEmployee_groupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
