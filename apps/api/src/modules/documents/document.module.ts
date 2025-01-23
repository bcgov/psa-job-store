import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DocumentController } from './document.controller';
import { DocumentResolver } from './document.resolver';
import { DocumentService } from './document.service';

@Module({
  imports: [
    PrismaModule,
    //   ,ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    //   serveRoot: '/uploads',
    // }),
  ],
  providers: [DocumentService, DocumentResolver],
  controllers: [DocumentController],
})
export class DocumentModule {}
