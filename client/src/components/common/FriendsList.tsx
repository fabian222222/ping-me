"use client";

import React from "react";
import { Friend } from "@/services/friends.service";
import UserAvatar from "./UserAvatar";

export const FriendsList: React.FC<{
    friends: Friend[];
    onFriendClick: (friendId: string) => void;
}> = ({ friends, onFriendClick }) => {
    const getStatusText = (status: "ONLINE" | "OFFLINE" | "INVISIBLE") => {
        const statusTexts = {
            ONLINE: "En ligne",
            OFFLINE: "Hors ligne",
            INVISIBLE: "Invisible",
        };
        return statusTexts[status];
    };

    return (
        <div className="p-4">
            <h3 className="text-sm font-medium text-slate-500 mb-3">
                Ami(s) ({friends.length})
            </h3>
            <div className="space-y-3">
                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-lg cursor-pointer"
                        onClick={() => onFriendClick(friend.id)}
                    >
                        <UserAvatar
                            user={friend}
                            showStatus={true}
                            status={friend.status}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                                {friend.firstName} {friend.lastName}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">
                                {getStatusText(friend.status)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
