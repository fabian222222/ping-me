import axios from "axios";
import {
    CreateMessageDto,
    Message,
    UpdateMessageDto,
} from "@/types/message.types";
import { api } from "@/lib/api";
import { API_URL } from "@/constants/api";

export const MessagesService = {
    async getAllMessages(): Promise<Message[]> {
        const response = await api.get(`${API_URL}/messages`);
        return response.data;
    },

    async getMessageById(id: string): Promise<Message> {
        const response = await api.get(`${API_URL}/messages/${id}`);
        return response.data;
    },

    async getUserMessages(userId: string): Promise<Message[]> {
        const response = await api.get(`${API_URL}/messages/user/${userId}`);
        return response.data;
    },

    async createMessage(message: CreateMessageDto): Promise<Message> {
        const response = await api.post(`${API_URL}/messages`, message);
        return response.data;
    },

    async updateMessage(
        id: string,
        message: UpdateMessageDto
    ): Promise<Message> {
        const response = await api.put(`${API_URL}/messages/${id}`, message);
        return response.data;
    },

    async deleteMessage(id: string): Promise<void> {
        await axios.delete(`${API_URL}/messages/${id}`);
    },
};
