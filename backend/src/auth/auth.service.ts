import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async login(createAuthDto: CreateAuthDto) {
    const user = await prisma.user.findFirst({
      where: {
        password: createAuthDto.password,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Senha inválida');
    }

    return user;
  }
}