import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationCreateManyInput } from './organization-create-many.input';

@ArgsType()
export class CreateManyOrganizationArgs {
  @Field(() => [OrganizationCreateManyInput], { nullable: false })
  @Type(() => OrganizationCreateManyInput)
  data!: Array<OrganizationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
