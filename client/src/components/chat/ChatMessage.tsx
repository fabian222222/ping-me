"use client";

import { Message } from "@/types/message.types";
import { useAuthContext } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import UserAvatar from "../common/UserAvatar";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const { user } = useAuthContext();
    const isCurrentUser = message.sender.id === user?.id;

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className={`flex items-start gap-2 mb-4 ${
                isCurrentUser ? "flex-row-reverse" : ""
            }`}
        >
            {!isCurrentUser && (
                <div className="flex-shrink-0 mt-1">
                    <UserAvatar
                        user={message.sender}
                        showStatus={true}
                        status={message.sender.status}
                    />
                </div>
            )}
            <div
                className={`max-w-[75%] flex flex-col ${
                    isCurrentUser ? "items-end" : "items-start"
                }`}
            >
                {!isCurrentUser && (
                    <span className="text-sm font-medium text-slate-700 mb-1">
                        {message.sender.firstName}
                    </span>
                )}
                <div
                    className={cn(
                        "rounded-2xl px-4 py-2 shadow-sm text-white",
                        isCurrentUser ? "rounded-tr-none" : "rounded-tl-none"
                    )}
                    style={{
                        backgroundColor: isCurrentUser
                            ? user?.messageColor || "#171717"
                            : message.sender.messageColor || "#171717",
                    }}
                >
                    {message.content}
                </div>
                <span className="text-xs text-slate-500 mt-1">
                    {formatTime(new Date(message.createdAt))}
                </span>
            </div>
        </div>
    );
};

export default ChatMessage;
