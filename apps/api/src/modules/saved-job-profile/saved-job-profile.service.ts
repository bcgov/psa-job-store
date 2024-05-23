import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedJobProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async saveJobProfile(userId: string, jobProfileId: number) {
    await this.prisma.savedJobProfile.create({
      data: {
        user: { connect: { id: userId } },
        jobProfile: { connect: { id: jobProfileId } },
      },
    });
    return true;
  }

  async removeSavedJobProfile(userId: string, jobProfileId: number) {
    await this.prisma.savedJobProfile.delete({
      where: {
        userId_jobProfileId: {
          userId,
          jobProfileId,
        },
      },
    });
    return true;
  }

  async getSavedJobProfileIds(userId: string) {
    const savedJobProfiles = await this.prisma.savedJobProfile.findMany({
      where: { userId },
      select: { jobProfileId: true },
    });
    return savedJobProfiles.map((savedJobProfile) => savedJobProfile.jobProfileId);
  }
}
