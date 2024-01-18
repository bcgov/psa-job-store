import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateWithoutJob_profilesInput } from './professional-designation-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput } from './professional-designation-create-or-connect-without-job-profiles.input';
import { ProfessionalDesignationUpsertWithoutJob_profilesInput } from './professional-designation-upsert-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { ProfessionalDesignationUpdateToOneWithWhereWithoutJob_profilesInput } from './professional-designation-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput {
  @Field(() => ProfessionalDesignationCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationCreateWithoutJob_profilesInput)
  create?: ProfessionalDesignationCreateWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: ProfessionalDesignationCreateOrConnectWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationUpsertWithoutJob_profilesInput)
  upsert?: ProfessionalDesignationUpsertWithoutJob_profilesInput;

  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereUniqueInput)
  connect?: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => ProfessionalDesignationUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => ProfessionalDesignationUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: ProfessionalDesignationUpdateToOneWithWhereWithoutJob_profilesInput;
}
