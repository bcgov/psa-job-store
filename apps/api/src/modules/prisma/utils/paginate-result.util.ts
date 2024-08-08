import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../models/page-info.model';

export function PaginateResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResult {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    constructor(data: T[], pageInfo: PageInfo) {
      this.data = data;
      this.pageInfo = pageInfo;
    }
  }

  return PaginatedResult;
}
