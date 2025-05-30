"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useFriends } from "@/providers/FriendsProvider";
import { useEffect } from "react";
import { UserStatus } from "@/types/auth";

const FriendRequests = () => {
    const {
        pendingRequests,
        loadPendingRequests,
        acceptFriendRequest,
        rejectFriendRequest,
    } = useFriends();

    useEffect(() => {
        loadPendingRequests();
    }, [loadPendingRequests]);

    if (pendingRequests.length === 0) {
        return (
            <h4 className="text-sm font-medium text-slate-500">
                Vous n'avez pas de demandes d'amis
            </h4>
        );
    }

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-500">
                Demandes d'amis ({pendingRequests.length})
            </h4>
            {pendingRequests.map((request) => (
                <div
                    key={request.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"
                >
                    <UserAvatar
                        user={{
                            id: request.sender.id,
                            username: request.sender.username,
                            firstName: request.sender.username,
                            lastName: "",
                            email: "",
                            avatar: request.sender.avatar || undefined,
                            status: UserStatus.OFFLINE,
                            emailVerified: false,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            twoFactorEnabled: false,
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                            {request.sender.username}
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => acceptFriendRequest(request.id)}
                        >
                            <Check className="h-3 w-3" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => rejectFriendRequest(request.id)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;
