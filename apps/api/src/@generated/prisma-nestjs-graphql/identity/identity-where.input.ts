import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class IdentityWhereInput {
  @Field(() => [IdentityWhereInput], { nullable: true })
  AND?: Array<IdentityWhereInput>;

  @Field(() => [IdentityWhereInput], { nullable: true })
  OR?: Array<IdentityWhereInput>;

  @Field(() => [IdentityWhereInput], { nullable: true })
  NOT?: Array<IdentityWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  sub?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  identity_provider?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  user_id?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  created_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  deleted_at?: DateTimeFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  user?: UserRelationFilter;
}
