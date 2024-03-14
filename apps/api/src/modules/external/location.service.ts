import { Injectable } from '@nestjs/common';
import { FindManyLocationArgs, FindUniqueLocationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async getLocations(args?: FindManyLocationArgs) {
    return this.prisma.location.findMany({
      ...args,
      include: {
        _count: {
          select: { departments: true },
        },
      },
    });
  }

  async getLocation(args?: FindUniqueLocationArgs) {
    return this.prisma.location.findUnique({ ...args });
  }
}
