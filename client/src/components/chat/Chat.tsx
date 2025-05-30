"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import UserInfoPanel from "./UserInfoPanel";
import { Button } from "@/components/ui/button";
import { Info, ArrowLeft } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { useMessages } from "@/providers/MessagesProvider";
import { useFriends } from "@/providers/FriendsProvider";
import { UserAvatar as UserAvatarType } from "@/types/user";
import { AuthResponse, UserStatus } from "@/types/auth";

interface PersonalChatLayoutProps {
    userId: string;
}

const Chat = ({ userId }: PersonalChatLayoutProps) => {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, getUserMessages, userSelected } = useMessages();
    const { friends } = useFriends();

    const chatUser = friends.find((user) => user.id === userId);

    useEffect(() => {
        if (userId) {
            getUserMessages(userId);
        }
    }, [userId, getUserMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!chatUser) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Utilisateur non trouvé</p>
            </div>
        );
    }

    const userAvatarData: UserAvatarType = {
        firstName: chatUser.firstName,
        lastName: chatUser.lastName,
        email: chatUser.email,
    };

    const userInfoData: AuthResponse["user"] = {
        id: chatUser.id,
        email: chatUser.email,
        firstName: chatUser.firstName,
        lastName: chatUser.lastName,
        username: chatUser.username,
        status:
            chatUser.status === "INVISIBLE"
                ? UserStatus.OFFLINE
                : UserStatus[chatUser.status],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        twoFactorEnabled: false,
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 h-screen max-h-screen">
            <div
                className={`${
                    showUserInfo ? "lg:col-span-3" : "lg:col-span-4"
                } h-full flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b bg-white">
                    <div className="flex items-center gap-3">
                        <UserAvatar
                            user={userAvatarData}
                            showStatus={true}
                            status={chatUser.status}
                        />
                        <div>
                            <h2 className="font-semibold">
                                {chatUser.username}
                            </h2>
                            <p className="text-sm text-slate-500 capitalize">
                                {chatUser.status.toLowerCase()}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUserInfo(!showUserInfo)}
                    >
                        <Info className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 max-h-[calc(100vh-170px)]">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))
                    ) : (
                        <div className="text-center text-slate-500 mt-8">
                            <p>
                                Aucun message encore. Commencez la conversation
                                !
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <ChatInput receiverId={userSelected || ""} />
            </div>

            {showUserInfo && (
                <div className="lg:col-span-1 h-full border-l bg-white">
                    <UserInfoPanel
                        user={userInfoData}
                        onClose={() => setShowUserInfo(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default Chat;
