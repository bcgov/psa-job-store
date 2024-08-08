import { Field, ObjectType } from '@nestjs/graphql';

export type WithPageInfo<T> = T & PageInfo;

@ObjectType()
export class PageInfo {
  @Field(() => Number, { nullable: false })
  page!: number;

  @Field(() => Number, { nullable: false })
  pageCount: number;

  @Field(() => Number, { nullable: false })
  totalCount: number;
}
