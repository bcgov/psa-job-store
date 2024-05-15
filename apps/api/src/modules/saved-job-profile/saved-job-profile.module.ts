import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SavedJobProfileResolver } from './saved-job-profile.resolver';
import { SavedJobProfileService } from './saved-job-profile.service';

@Module({
  imports: [PrismaModule],
  providers: [SavedJobProfileResolver, SavedJobProfileService],
})
export class SavedJobProfileModule {}
