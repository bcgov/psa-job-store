import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class IdentityScalarWhereInput {
  @Field(() => [IdentityScalarWhereInput], { nullable: true })
  AND?: Array<IdentityScalarWhereInput>;

  @Field(() => [IdentityScalarWhereInput], { nullable: true })
  OR?: Array<IdentityScalarWhereInput>;

  @Field(() => [IdentityScalarWhereInput], { nullable: true })
  NOT?: Array<IdentityScalarWhereInput>;

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
}
