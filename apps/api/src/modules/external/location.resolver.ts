import { Args, Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { FindManyLocationArgs, Location } from '../../@generated/prisma-nestjs-graphql';
import { LocationService } from './location.service';

@ObjectType()
export class ExtendedLocation extends Location {
  @Field(() => Int, { nullable: true })
  departmentCount?: number;
}

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => [ExtendedLocation], { name: 'locations' })
  getLocations(@Args() args?: FindManyLocationArgs) {
    return this.locationService.getLocations(args).then((locations) =>
      locations.map((location) => ({
        ...location,
        departmentCount: location._count?.departments,
      })),
    );
  }
}
