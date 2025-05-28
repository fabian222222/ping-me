import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('creatorId') creatorId: string,
  ) {
    return this.groupsService.create(name, creatorId);
  }

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Post(':id/users')
  async addUser(
    @Param('id') groupId: string,
    @Body('userId') userId: string,
  ) {
    return this.groupsService.addUserToGroup(groupId, userId);
  }

  @Delete(':groupId/users/:userId')
  async removeUser(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.removeUserFromGroup(groupId, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }

  @Get(':id/members')
  async getGroupMembers(@Param('id') id: string) {
    return this.groupsService.getGroupMembers(id);
  }
} 