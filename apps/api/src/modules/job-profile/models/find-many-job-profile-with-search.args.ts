import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { FindManyJobProfileArgs } from '../../../@generated/prisma-nestjs-graphql';

@ArgsType()
export class FindManyJobProfileWithSearchArgs extends FindManyJobProfileArgs {
  @Field(() => String, { nullable: true })
  @Type(() => String)
  search?: string;
}
