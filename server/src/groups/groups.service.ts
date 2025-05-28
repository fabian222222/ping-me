import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, User } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, creatorId: string): Promise<Group> {
    const group = await this.prisma.group.create({
      data: {
        name,
        users: {
          create: {
            userId: creatorId,
          },
        },
      },
    });
    return group;
  }

  async findAll(): Promise<Group[]> {
    return this.prisma.group.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async addUserToGroup(groupId: string, userId: string): Promise<void> {
    await this.prisma.groupUser.create({
      data: {
        userId,
        groupId,
      },
    });
  }

  async removeUserFromGroup(groupId: string, userId: string): Promise<void> {
    await this.prisma.groupUser.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }

  async delete(id: string): Promise<Group> {
    return this.prisma.group.delete({
      where: { id },
    });
  }

  async getGroupMembers(groupId: string): Promise<User[]> {
    const groupUsers = await this.prisma.groupUser.findMany({
      where: { groupId },
      include: { user: true },
    });
    return groupUsers.map((gu) => gu.user);
  }
} 