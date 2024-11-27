import { ArgsType, IntersectionType } from '@nestjs/graphql';
import { FindManyPositionRequestArgs } from '../../../@generated/prisma-nestjs-graphql';
import { SearchArgs } from '../../../args/search.args';

@ArgsType()
export class FindManyPositionRequestWithSearch extends IntersectionType(FindManyPositionRequestArgs, SearchArgs) {}

@ArgsType()
export class ExtendedFindManyPositionRequestWithSearch extends FindManyPositionRequestWithSearch {}
