import { api } from "../lib/api";

export interface Friend {
    id: string;
    username: string;
    avatar: string | null;
    status: "ONLINE" | "OFFLINE" | "INVISIBLE";
    firstName: string;
    lastName: string;
    email: string;
}

export interface FriendRequest {
    id: string;
    sender: {
        id: string;
        username: string;
        avatar: string | null;
    };
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
}

export const getFriends = async (): Promise<Friend[]> => {
    const { data } = await api.get<Friend[]>("/friendship/friends");
    return data;
};

export const getPendingRequests = async (): Promise<FriendRequest[]> => {
    const { data } = await api.get<FriendRequest[]>("/friendship/pending");
    return data;
};

export const sendFriendRequest = async (identifier: string): Promise<void> => {
    await api.post("/friendship/request", { identifier });
};

export const acceptFriendRequest = async (requestId: string): Promise<void> => {
    await api.post(`/friendship/accept/${requestId}`);
};

export const rejectFriendRequest = async (requestId: string): Promise<void> => {
    await api.post(`/friendship/reject/${requestId}`);
};
