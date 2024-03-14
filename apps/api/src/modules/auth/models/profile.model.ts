import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileCrmMetadata {
  @Field(() => Number, { nullable: true })
  account_id?: number;

  @Field(() => Number, { nullable: true })
  contact_id?: number;
}

@ObjectType()
export class ProfileMetadata {
  @Field(() => ProfileCrmMetadata, { nullable: true })
  crm: ProfileCrmMetadata;
}

@ObjectType()
export class Profile {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  department_id?: string;

  @Field(() => String, { nullable: true })
  employee_id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  position_id?: string;

  @Field(() => ProfileMetadata, { nullable: true })
  metadata?: ProfileMetadata;
}
