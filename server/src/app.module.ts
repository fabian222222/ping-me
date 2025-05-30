import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [UsersModule, AuthModule, GroupsModule, FriendshipModule],
})
export class AppModule {}
