import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import {
    Message,
    CreateMessageDto,
    UpdateMessageDto,
} from "@/types/message.types";
import { MessagesService } from "@/services/messages.service";
import { useAuthContext } from "./AuthProvider";

interface MessagesContextType {
    messages: Message[];
    loading: boolean;
    error: string | null;
    getAllMessages: () => Promise<void>;
    getUserMessages: (userId: string) => Promise<void>;
    createMessage: (message: CreateMessageDto) => Promise<Message>;
    updateMessage: (id: string, message: UpdateMessageDto) => Promise<void>;
    deleteMessage: (id: string) => Promise<void>;
    userSelected: string | null;
    setUserSelected: (userId: string) => void;
    setMessages: (messages: Message[]) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
    undefined
);

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error("useMessages must be used within a MessagesProvider");
    }
    return context;
};

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [userSelected, setUserSelected] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthContext();

    const getAllMessages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await MessagesService.getAllMessages();
            setMessages(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred while fetching messages"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const getUserMessages = useCallback(async (userId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await MessagesService.getUserMessages(userId);
            setMessages(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred while fetching user messages"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const createMessage = useCallback(async (messageData: CreateMessageDto) => {
        try {
            setLoading(true);
            setError(null);
            const newMessage = await MessagesService.createMessage(messageData);
            setMessages((prev) => [...prev, newMessage]);
            return newMessage;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred while creating the message"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateMessage = useCallback(
        async (id: string, messageData: UpdateMessageDto) => {
            try {
                setLoading(true);
                setError(null);
                const updatedMessage = await MessagesService.updateMessage(
                    id,
                    messageData
                );
                setMessages((prev) =>
                    prev.map((message) =>
                        message.id === id ? updatedMessage : message
                    )
                );
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "An error occurred while updating the message"
                );
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const deleteMessage = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await MessagesService.deleteMessage(id);
            setMessages((prev) => prev.filter((message) => message.id !== id));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred while deleting the message"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            getAllMessages();
        }
    }, [user, getAllMessages]);

    const value = {
        messages,
        userSelected,
        setUserSelected,
        loading,
        error,
        getAllMessages,
        getUserMessages,
        createMessage,
        updateMessage,
        deleteMessage,
        setMessages,
    };

    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    );
};
