import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutJob_provilesInput } from './organization-update-without-job-proviles.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutJob_provilesInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutJob_provilesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJob_provilesInput)
  data!: OrganizationUpdateWithoutJob_provilesInput;
}
