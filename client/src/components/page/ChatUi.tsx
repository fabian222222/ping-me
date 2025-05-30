"use client";
import NoFriends from "@/components/chat/NoFriends";
import { useFriends } from "@/providers/FriendsProvider";
import NoChatSelected from "../chat/NoChatSelected";
import { useMessages } from "@/providers/MessagesProvider";
import Chat from "../chat/Chat";

const ChatUi = () => {
    const { friends } = useFriends();
    const { userSelected } = useMessages();

    if (!friends) {
        return null;
    }

    return (
        <div className="h-screen">
            {userSelected ? (
                <Chat userId={userSelected} />
            ) : friends.length === 0 ? (
                <NoFriends />
            ) : (
                <NoChatSelected />
            )}
        </div>
    );
};

export default ChatUi;
