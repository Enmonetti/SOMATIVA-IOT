import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';

const prisma = new PrismaClient();

@Injectable()
export class TelemetryService {

  async create(createTelemetryDto: CreateTelemetryDto) {

    const equipment = await prisma.equipment.findUnique({
      where: {
        id: createTelemetryDto.equipmentId,
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipamento não encontrado');
    }

    return prisma.telemetry.create({
      data: createTelemetryDto,
    });
  }

  async findAll() {
    return prisma.telemetry.findMany({
      include: {
        equipment: true,
      },
    });
  }

  async findOne(id: number) {
    return prisma.telemetry.findUnique({
      where: { id },
      include: {
        equipment: true,
      },
    });
  }

  async update(id: number, updateTelemetryDto: UpdateTelemetryDto) {
    return prisma.telemetry.update({
      where: { id },
      data: updateTelemetryDto,
    });
  }

  async remove(id: number) {
    return prisma.telemetry.delete({
      where: { id },
    });
  }
}