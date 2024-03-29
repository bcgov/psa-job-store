import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClassificationService } from '../external/classification.service';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PositionRequestApiResolver } from './position-request.resolver';
import { PositionRequestApiService } from './position-request.service';

@Module({
  imports: [ExternalModule, HttpModule, PrismaModule],
  providers: [
    ClassificationService,
    CrmService,
    PeoplesoftService,
    PositionRequestApiResolver,
    PositionRequestApiService,
  ],
})
export class PositionRequestModule {}
