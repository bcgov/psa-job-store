import { ObjectType } from '@nestjs/graphql';
import { User } from '../../../@generated/prisma-nestjs-graphql';
import { PageInfo } from '../../prisma/models/page-info.model';
import { PaginateResult } from '../../prisma/utils/paginate-result.util';

@ObjectType()
export class PaginatedUsersResponse extends PaginateResult(User) {
  constructor(data: User[], pageInfo: PageInfo) {
    super(data, pageInfo);
  }
}
