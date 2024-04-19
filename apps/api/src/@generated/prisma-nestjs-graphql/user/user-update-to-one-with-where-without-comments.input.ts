import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCommentsInput } from './user-update-without-comments.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCommentsInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutCommentsInput, { nullable: false })
  @Type(() => UserUpdateWithoutCommentsInput)
  data!: UserUpdateWithoutCommentsInput;
}
