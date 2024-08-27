import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Int, { nullable: false })
  page: number;

  @Field(() => Int, { nullable: false })
  pageCount: number;

  @Field(() => Int, { nullable: false })
  pageSize: number;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
