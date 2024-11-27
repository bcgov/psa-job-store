import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(record_id: number, record_type: string) {
    return this.prisma.comment.findMany({
      where: { record_id, record_type },
      include: {
        author: true,
      },
      orderBy: [{ updated_at: 'desc' }],
    });
  }

  async getComment(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }
}
