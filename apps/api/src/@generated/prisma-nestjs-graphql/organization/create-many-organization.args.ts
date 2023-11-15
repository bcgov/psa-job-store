import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationCreateManyInput } from './organization-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyOrganizationArgs {
  @Field(() => [OrganizationCreateManyInput], { nullable: false })
  @Type(() => OrganizationCreateManyInput)
  data!: Array<OrganizationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
