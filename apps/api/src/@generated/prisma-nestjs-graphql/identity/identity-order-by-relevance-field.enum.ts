import { registerEnumType } from '@nestjs/graphql';

export enum IdentityOrderByRelevanceFieldEnum {
  sub = 'sub',
  identity_provider = 'identity_provider',
  user_id = 'user_id',
}

registerEnumType(IdentityOrderByRelevanceFieldEnum, {
  name: 'IdentityOrderByRelevanceFieldEnum',
  description: undefined,
});
