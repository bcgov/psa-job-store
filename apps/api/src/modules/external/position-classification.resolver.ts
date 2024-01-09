import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUniquePositionClassificationArgs } from './models/find-unique-position-classification.args';
import { PositionClassification } from './models/position-classification.model';
import { PeoplesoftService } from './peoplesoft.service';

@Resolver(() => PositionClassification)
export class PositionClassificationResolver {
  constructor(private readonly peoplesoftService: PeoplesoftService) {}

  @Query(() => PositionClassification, { name: 'classificationForPosition' })
  async getClassificationForPosition(@Args() args?: FindUniquePositionClassificationArgs) {
    const result = await this.peoplesoftService.getClassificationForPosition(args.where.position_id);
    const classification = result.data.query.rows.length > 0 ? result.data.query.rows[0].JOBCODE : null;

    return {
      classification_id: classification,
    };
  }
}
