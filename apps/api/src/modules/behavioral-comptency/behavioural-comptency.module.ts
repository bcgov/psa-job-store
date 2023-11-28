import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BehaviouralComptencyResolver } from './behavioural-comptency.resolver';
import { BehaviouralComptencyService } from './behavioural-comptency.service';

@Module({
  imports: [PrismaModule],
  providers: [BehaviouralComptencyResolver, BehaviouralComptencyService],
})
export class BehaviouralComptencyModule {}
