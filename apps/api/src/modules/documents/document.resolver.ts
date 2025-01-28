import { Args, Query, Resolver } from '@nestjs/graphql';
import { Document, FindManyDocumentArgs } from '../../@generated/prisma-nestjs-graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { DocumentService } from './document.service';
import { PaginatedDocumentsResponse } from './paginated-documents-response.output';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Roles('classification', 'hiring-manager', 'total-compensation')
  @Query(() => PaginatedDocumentsResponse, { name: 'documentsWithCount' })
  getDocumentsWithCount(@Args() args?: FindManyDocumentArgs) {
    return this.documentService.getDocumentsWithCount(args);
  }

  @Roles('classification')
  @Query(() => Document, { name: 'document' })
  async getDocument(@Args('id') id: string) {
    const res = await this.documentService.getDocument(id);
    return res;
  }

  // checks if the URL is already in use.
  @Query(() => Document, { name: 'checkURL', nullable: true })
  async checkDocumentURL(@Args('url') url: string) {
    const res = await this.documentService.getDocumentByUrl(url);
    return res;
  }
}
