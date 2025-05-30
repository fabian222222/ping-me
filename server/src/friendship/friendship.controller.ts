import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';

@Controller('friendship')
@UseGuards(JwtAuthGuard)
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('request')
  async sendFriendRequest(@Request() req, @Body() dto: SendFriendRequestDto) {
    return this.friendshipService.sendFriendRequest(req.user.userId, dto);
  }

  @Post('accept/:requestId')
  async acceptFriendRequest(
    @Request() req,
    @Param('requestId') requestId: string,
  ) {
    return this.friendshipService.acceptFriendRequest(
      req.user.userId,
      requestId,
    );
  }

  @Post('reject/:requestId')
  async rejectFriendRequest(
    @Request() req,
    @Param('requestId') requestId: string,
  ) {
    return this.friendshipService.rejectFriendRequest(
      req.user.userId,
      requestId,
    );
  }

  @Get('pending')
  async getPendingRequests(@Request() req) {
    return this.friendshipService.getPendingRequests(req.user.userId);
  }

  @Get('friends')
  async getFriends(@Request() req) {
    return this.friendshipService.getFriends(req.user.userId);
  }
}
