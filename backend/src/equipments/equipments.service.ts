import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

const prisma = new PrismaClient();

@Injectable()
export class EquipmentsService {

  create(createEquipmentDto: CreateEquipmentDto) {
    return prisma.equipment.create({
      data: createEquipmentDto,
    });
  }

  findAll() {
    return prisma.equipment.findMany({
      include: {
        comments: true,
        telemetry: true,
      },
    });
  }

  findOne(id: number) {
    return prisma.equipment.findUnique({
      where: { id },
      include: {
        comments: true,
        telemetry: true,
      },
    });
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return prisma.equipment.update({
      where: { id },
      data: updateEquipmentDto,
    });
  }

  remove(id: number) {
    return prisma.equipment.delete({
      where: { id },
    });
  }
}