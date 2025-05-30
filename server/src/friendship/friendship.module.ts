import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FriendshipGateway } from 'src/gateways/friendship.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipGateway],
  exports: [FriendshipService],
})
export class FriendshipModule {}
