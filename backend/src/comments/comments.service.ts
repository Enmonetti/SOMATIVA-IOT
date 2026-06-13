import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

const prisma = new PrismaClient();

@Injectable()
export class CommentsService {

  async create(createCommentDto: CreateCommentDto) {

    const equipment = await prisma.equipment.findUnique({
      where: {
        id: createCommentDto.equipmentId,
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipamento não encontrado');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: createCommentDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return prisma.comment.create({
      data: {
        description: createCommentDto.description,
        equipmentId: createCommentDto.equipmentId,
        userId: createCommentDto.userId,
      },
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
      include: {
        equipment: true,
        user: true,
      },
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