import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from '@prisma/client';
import {
  MessageNotFoundException,
  UnauthorizedMessageAccessException,
  UnauthorizedMessageModificationException,
} from './exceptions/message.exceptions';
import { MessagesGateway } from '../gateways/messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private messagesGateway: MessagesGateway,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    currentUser: { userId: string },
  ): Promise<Message> {
    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        receiver: { connect: { id: createMessageDto.receiverId } },
        sender: { connect: { id: currentUser.userId } },
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    this.messagesGateway.sendMessageToUser(
      createMessageDto.receiverId,
      'newMessage',
      message,
    );

    return message;
  }

  async findAll(currentUser: { userId: string }): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.userId },
          { receiverId: currentUser.userId },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async findOne(id: string, currentUser: { userId: string }): Promise<Message> {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!message) {
      throw new MessageNotFoundException();
    }

    if (
      message.senderId !== currentUser.userId &&
      message.receiverId !== currentUser.userId
    ) {
      throw new UnauthorizedMessageAccessException();
    }

    return message;
  }

  async findByUser(
    userId: string,
    currentUser: { userId: string },
  ): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [{ senderId: currentUser.userId }, { receiverId: userId }],
          },
          {
            AND: [{ senderId: userId }, { receiverId: currentUser.userId }],
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
    currentUser: { userId: string },
  ): Promise<Message> {
    const message = await this.findOne(id, currentUser);

    if (message.senderId !== currentUser.userId) {
      throw new UnauthorizedMessageModificationException();
    }

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

  async remove(id: string, currentUser: { userId: string }): Promise<Message> {
    const message = await this.findOne(id, currentUser);

    if (message.senderId !== currentUser.userId) {
      throw new UnauthorizedMessageModificationException();
    }

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
