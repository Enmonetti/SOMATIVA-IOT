import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

const prisma = new PrismaClient();

@Injectable()
export class ProfilesService {

  create(createProfileDto: CreateProfileDto) {
    return prisma.profile.create({
      data: createProfileDto,
    });
  }

  findAll() {
    return prisma.profile.findMany({
      include: {
        users: true,
      },
    });
  }

  findOne(id: number) {
    return prisma.profile.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  remove(id: number) {
    return prisma.profile.delete({
      where: { id },
    });
  }
}