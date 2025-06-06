import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersGateway } from '../gateways/users.gateway';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersGateway: UsersGateway,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(userData: RegisterDto): Promise<User> {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data = { ...updateUserDto };
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    if (updateUserDto.messageColor) {
      this.usersGateway.broadcastUserUpdate(id, {
        messageColor: updateUserDto.messageColor,
      });
    }

    return updatedUser;
  }
}
