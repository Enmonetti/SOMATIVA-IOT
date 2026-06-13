import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';
import { UpdateTelemetryDto } from './dto/update-telemetry.dto';

const prisma = new PrismaClient();

@Injectable()
export class TelemetryService {

  create(createTelemetryDto: CreateTelemetryDto) {
    return prisma.telemetry.create({
      data: createTelemetryDto,
    });
  }

  findAll() {
    return prisma.telemetry.findMany({
      include: {
        equipment: true,
      },
    });
  }

  findOne(id: number) {
    return prisma.telemetry.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTelemetryDto: UpdateTelemetryDto) {
    return prisma.telemetry.update({
      where: { id },
      data: updateTelemetryDto,
    });
  }

  remove(id: number) {
    return prisma.telemetry.delete({
      where: { id },
    });
  }
}