import { ObjectType } from '@nestjs/graphql';
import { Department } from '../../../../@generated/prisma-nestjs-graphql';
import { PageInfo } from '../../../prisma/models/page-info.model';
import { PaginateResult } from '../../../prisma/utils/paginate-result.util';

@ObjectType()
export class PaginatedDepartmentsResponse extends PaginateResult(Department) {
  constructor(data: Department[], pageInfo: PageInfo) {
    super(data, pageInfo);
  }
}
