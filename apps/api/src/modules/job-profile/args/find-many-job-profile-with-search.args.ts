import { ArgsType, IntersectionType } from '@nestjs/graphql';
import { FindManyJobProfileArgs } from '../../../@generated/prisma-nestjs-graphql';
import { SearchArgs } from '../../../args/search.args';

@ArgsType()
export class FindManyJobProfileWithSearch extends IntersectionType(FindManyJobProfileArgs, SearchArgs) {}
