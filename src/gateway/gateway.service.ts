import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GatewayService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }
}
