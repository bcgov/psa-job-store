import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderByRelevanceFieldEnum {
  id = 'id',
  name = 'name',
  email = 'email',
  username = 'username',
  roles = 'roles',
}

registerEnumType(UserOrderByRelevanceFieldEnum, { name: 'UserOrderByRelevanceFieldEnum', description: undefined });
