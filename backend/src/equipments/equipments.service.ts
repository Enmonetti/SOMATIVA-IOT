import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

const prisma = new PrismaClient();

@Injectable()
export class EquipmentsService {

  async create(createEquipmentDto: CreateEquipmentDto) {

    console.log('DTO SERVICE:', createEquipmentDto);

    return await prisma.equipment.create({
      data: {
        name: createEquipmentDto.name,
        description: createEquipmentDto.description,
        imageUrl: createEquipmentDto.imageUrl,
        status: createEquipmentDto.status,
      },
    });
  }

  async findAll() {
    return await prisma.equipment.findMany({
      include: {
        comments: true,
        telemetry: true,
      },
    });
  }

  async findOne(id: number) {
    return await prisma.equipment.findUnique({
      where: { id },
      include: {
        comments: true,
        telemetry: true,
      },
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return await prisma.equipment.update({
      where: { id },
      data: updateEquipmentDto,
    });
  }

  async remove(id: number) {
    return await prisma.equipment.delete({
      where: { id },
    });
  }
}