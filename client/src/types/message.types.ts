import { User } from "./user";

export interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
    sender: User;
    receiver: User;
}

export interface CreateMessageDto {
    content: string;
    receiverId: string;
}

export interface UpdateMessageDto {
    content: string;
}
