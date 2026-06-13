import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

const prisma = new PrismaClient();

@Injectable()
export class CommentsService {

  create(createCommentDto: CreateCommentDto) {
    return prisma.comment.create({
      data: createCommentDto,
    });
  }

  findAll() {
    return prisma.comment.findMany({
      include: {
        equipment: true,
        user: true,
      },
    });
  }

  findOne(id: number) {
    return prisma.comment.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  remove(id: number) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}