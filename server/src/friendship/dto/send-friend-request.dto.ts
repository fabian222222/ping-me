import { IsString, IsNotEmpty } from 'class-validator';

export class SendFriendRequestDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;
}
