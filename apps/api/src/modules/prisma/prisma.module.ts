import { Global, Module, forwardRef } from '@nestjs/common';
import { SearchModule } from '../search/search.module';
import { SearchService } from '../search/search.service';
import { PGLitePrismaService } from './pglite-prisma.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [forwardRef(() => SearchModule)],
  providers: [
    {
      provide: PrismaService,
      useFactory: (searchService: SearchService) => {
        if (process.env.E2E_TESTING === 'true') return new PGLitePrismaService(searchService);
        else return new PrismaService(searchService);
      },
      inject: [SearchService],
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
