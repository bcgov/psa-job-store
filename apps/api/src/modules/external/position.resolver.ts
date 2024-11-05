import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUniquePositionArgs } from './models/find-unique-position.args';
import { PositionProfile } from './models/position-profile.model';
import { Position } from './models/position.model';
import { PositionService } from './position.service';

@Resolver(() => Position)
export class PositionResolver {
  constructor(private readonly positionService: PositionService) {}

  @Query(() => Position, { name: 'position' })
  async getPosition(@Args() args?: FindUniquePositionArgs) {
    return await this.positionService.getPosition(args);
  }

  @Query(() => [PositionProfile], { name: 'positionProfile' })
  async getPositionProfile(
    @Args('positionNumber') positionNumber: string,
    @Args({ name: 'extraInfo', nullable: true }) extraInfo?: boolean,
  ) {
    return await this.positionService.getPositionProfile(positionNumber, extraInfo);
  }
}
