import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';

@Module({
  imports: [PrismaModule],
  providers: [ClassificationResolver, ClassificationService],
})
export class ClassificationModule {}
