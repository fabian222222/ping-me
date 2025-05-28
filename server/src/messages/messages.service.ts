import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        receiver: { connect: { id: createMessageDto.receiverId } },
        sender: { connect: { id: 'USER_ID_FROM_REQUEST' } },
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async findAll(): Promise<Message[]> {
    return this.prisma.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async findOne(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async findByUser(userId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageDto.content,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async remove(id: string): Promise<Message> {
    return this.prisma.message.delete({
      where: { id },
    });
  }
} 