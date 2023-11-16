import { Query, Resolver } from '@nestjs/graphql';
import { BehaviouralCompetency } from '../../@generated/prisma-nestjs-graphql';
import { BehaviouralComptencyService } from './behavioural-comptency.service';

@Resolver(() => BehaviouralCompetency)
export class BehaviouralComptencyResolver {
  constructor(private readonly BehaviouralComptencyService: BehaviouralComptencyService) {}

  @Query(() => [BehaviouralCompetency], { name: 'behaviouralComptencies' })
  getBehaviouralComptencies() {
    return this.BehaviouralComptencyService.getBehaviouralComptencies();
  }
}
