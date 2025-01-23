import { ObjectType } from '@nestjs/graphql';
import { Document } from '../../@generated/prisma-nestjs-graphql';
import { PageInfo } from '../prisma/models/page-info.model';
import { PaginateResult } from '../prisma/utils/paginate-result.util';

@ObjectType()
export class PaginatedDocumentsResponse extends PaginateResult(Document) {
  constructor(data: Document[], pageInfo: PageInfo) {
    super(data, pageInfo);
  }
}
