import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateManyInput } from './professional-designation-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyProfessionalDesignationArgs {
  @Field(() => [ProfessionalDesignationCreateManyInput], { nullable: false })
  @Type(() => ProfessionalDesignationCreateManyInput)
  data!: Array<ProfessionalDesignationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
