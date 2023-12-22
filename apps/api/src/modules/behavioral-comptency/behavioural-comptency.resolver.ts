import { Args, Query, Resolver } from '@nestjs/graphql';
import { BehaviouralCompetency, FindManyBehaviouralCompetencyArgs } from '../../@generated/prisma-nestjs-graphql';
import { BehaviouralComptencyService } from './behavioural-comptency.service';

@Resolver(() => BehaviouralCompetency)
export class BehaviouralComptencyResolver {
  constructor(private readonly behaviouralComptencyService: BehaviouralComptencyService) {}

  @Query(() => [BehaviouralCompetency], { name: 'behaviouralComptencies' })
  getBehaviouralComptencies(@Args() args?: FindManyBehaviouralCompetencyArgs) {
    return this.behaviouralComptencyService.getBehaviouralComptencies(args);
  }
}
