import { Field, ObjectType } from '@nestjs/graphql';

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
}
