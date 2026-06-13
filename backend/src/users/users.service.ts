import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  create(createUserDto: CreateUserDto) {
    return prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return prisma.user.findMany({
      include: {
        profile: true,
        comments: true,
      },
    });
  }

  findOne(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        comments: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}