export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface User {
    id: string;
    username: string;
    avatar?: string;
    messageColor?: string;
}

export interface FriendRequest {
    id: string;
    senderId: string;
    receiverId: string;
    status: RequestStatus;
    sender: User;
    receiver: User;
    createdAt: string;
    updatedAt: string;
}
