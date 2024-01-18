import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateWithoutJob_profilesInput } from './professional-designation-create-without-job-profiles.input';

@InputType()
export class ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput {
  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: false })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  where!: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => ProfessionalDesignationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ProfessionalDesignationCreateWithoutJob_profilesInput)
  create!: ProfessionalDesignationCreateWithoutJob_profilesInput;
}
