import React, { createContext, useContext, useEffect } from "react";
import { Message } from "@/types/message.types";
import { useSocket as useSocketHook } from "@/hooks/useSocket";
import { FriendRequest } from "@/services/friends.service";
import { useMessages } from "./MessagesProvider";
import { useAuthContext } from "./AuthProvider";
import { useFriends } from "./FriendsProvider";

interface SocketContextType {}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const socket = useSocketHook();
    const { userSelected, setMessages } = useMessages();
    const { user } = useAuthContext();
    const { setPendingRequests } = useFriends();

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (message: Message) => {
                setMessages((prevMessages: Message[]) => {
                    const messageExists = prevMessages.some(
                        (m) => m.id === message.id
                    );
                    if (!messageExists) {
                        if (
                            userSelected &&
                            ((message.senderId === userSelected &&
                                message.receiverId === user?.id) ||
                                (message.senderId === user?.id &&
                                    message.receiverId === userSelected))
                        ) {
                            return [...prevMessages, message];
                        }
                    }
                    return prevMessages;
                });
            });

            socket.on(
                "userUpdate",
                (update: { userId: string; messageColor: string }) => {
                    setMessages((prevMessages: Message[]) =>
                        prevMessages.map((message) => {
                            if (message.sender.id === update.userId) {
                                return {
                                    ...message,
                                    sender: {
                                        ...message.sender,
                                        messageColor: update.messageColor,
                                    },
                                };
                            }
                            return message;
                        })
                    );
                }
            );

            socket.on("addFriend", (request: FriendRequest) => {
                console.log(request, "request add friend");
                setPendingRequests((prev: FriendRequest[]) => [
                    ...prev,
                    request,
                ]);
            });
        }

        return () => {
            if (socket) {
                socket.off("newMessage");
                socket.off("userUpdate");
                socket.off("addFriend");
            }
        };
    }, [socket, userSelected, user?.id]);

    return (
        <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
    );
};
