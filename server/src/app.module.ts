import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { FriendshipModule } from './friendship/friendship.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    GroupsModule,
    FriendshipModule,
    MessagesModule,
  ],
})
export class AppModule {}
