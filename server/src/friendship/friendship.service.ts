import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';

@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) {}

  private async findUserByIdentifier(identifier: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  async sendFriendRequest(
    senderId: string,
    { identifier }: SendFriendRequestDto,
  ) {
    const receiver = await this.findUserByIdentifier(identifier);
    const receiverId = receiver.id;

    if (senderId === receiverId) {
      throw new BadRequestException(
        "Vous ne pouvez pas vous envoyer une demande d'ami à vous-même",
      );
    }

    const existingRequest = await this.prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId,
        },
      },
    });

    if (existingRequest) {
      throw new BadRequestException("Une demande d'ami existe déjà");
    }

    return this.prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
        status: RequestStatus.PENDING,
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async acceptFriendRequest(userId: string, requestId: string) {
    const request = await this.prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException("Demande d'ami non trouvée");
    }

    if (request.receiverId !== userId) {
      throw new BadRequestException(
        'Vous ne pouvez accepter que les demandes qui vous sont envoyées',
      );
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    await this.prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: RequestStatus.ACCEPTED },
    });

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: request.receiverId },
        data: {
          friends: {
            connect: { id: request.senderId },
          },
        },
      }),
      this.prisma.user.update({
        where: { id: request.senderId },
        data: {
          friends: {
            connect: { id: request.receiverId },
          },
        },
      }),
    ]);

    return { message: "Demande d'ami acceptée" };
  }

  async rejectFriendRequest(userId: string, requestId: string) {
    const request = await this.prisma.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException("Demande d'ami non trouvée");
    }

    if (request.receiverId !== userId) {
      throw new BadRequestException(
        'Vous ne pouvez rejeter que les demandes qui vous sont envoyées',
      );
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new BadRequestException('Cette demande a déjà été traitée');
    }

    return this.prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: RequestStatus.REJECTED },
    });
  }

  async getPendingRequests(userId: string) {
    return this.prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: RequestStatus.PENDING,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  async getFriends(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user.friends;
  }
}
