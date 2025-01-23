import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindManyDocumentArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedDocumentsResponse } from './paginated-documents-response.output';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async getDocuments() {
    return this.prisma.document.findMany({
      orderBy: [{ updated_at: 'desc' }],
    });
  }

  async getDocumentsWithCount({
    skip = 0,
    take = 10,
    ...args
  }: FindManyDocumentArgs): Promise<PaginatedDocumentsResponse> {
    const result = await this.prisma.document.findManyAndCount({
      ...args,
      include: {
        jobFamilies: { include: { jobFamily: true } },
        streams: { include: { jobStream: true } },
      },
      take,
      skip,
      distinct: args.distinct as (keyof typeof Prisma.DocumentScalarFieldEnum)[],
    });

    const [data, page, pageCount, pageSize, totalCount] = result;

    return new PaginatedDocumentsResponse(data, { page, pageCount, pageSize, totalCount });
  }

  async getDocument(id: string) {
    return this.prisma.document.findUnique({
      where: { id },
      include: {
        jobFamilies: { include: { jobFamily: true } },
        streams: { include: { jobStream: true } },
      },
    });
  }

  async getDocumentByUrl(url: string) {
    return this.prisma.document.findUnique({
      where: { url },
    });
  }

  async createDocument(data: Prisma.DocumentCreateInput) {
    return this.prisma.document.create({ data });
  }

  async updateDocument(id: string, data: Prisma.DocumentUpdateInput) {
    return this.prisma.document.update({ where: { id }, data });
  }

  async deleteDocument(id: string) {
    // this.prisma.documentJobStreamLink.deleteMany({ where: { documentId: id } });
    // this.prisma.documentJobFamilyLink.deleteMany({ where: { documentId: id } });
    return this.prisma.document.delete({ where: { id } });
  }
}
