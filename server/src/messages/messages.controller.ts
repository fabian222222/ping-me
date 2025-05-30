import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @CurrentUser() user: { userId: string },
  ) {
    return this.messagesService.create(createMessageDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: string }) {
    return this.messagesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.messagesService.findOne(id, user);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @CurrentUser() user: { userId: string },
  ) {
    return this.messagesService.findByUser(userId, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @CurrentUser() user: { userId: string },
  ) {
    return this.messagesService.update(id, updateMessageDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.messagesService.remove(id, user);
  }
}
