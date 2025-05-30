"use client";

import { useAuthContext } from "@/providers/AuthProvider";
import UserAvatar from "./UserAvatar";
import AddFriendDialog from "../chat/AddFriendDialog";
import FriendRequests from "./FriendRequests";
import UserSettingsDialog from "./UserSettingsDialog";
import { LogOut, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { UserAvatar as UserAvatarType } from "@/types/user";
import { FriendsList } from "./FriendsList";
import { useEffect } from "react";
import { useFriends } from "@/providers/FriendsProvider";

interface SidebarProps {
    onLogout: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
    const { user, updateUser } = useAuthContext();
    const { friends, loadFriends } = useFriends();

    const adaptedUser: UserAvatarType = {
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    };

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    if (!user || !friends) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col border-r bg-white">
            <div className="w-full h-full flex flex-col border-r">
                <div className="p-4 border-b">
                    <div className="text-xl font-bold text-primary flex items-center gap-2">
                        <MessageSquare className="h-6 w-6" />
                        ping-me
                    </div>
                </div>

                <div className="p-4 border-b">
                    <div className="flex items-center gap-3 mb-3">
                        <UserAvatar user={adaptedUser} status={user.status} />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-slate-500 truncate">
                                {user?.email || "email@example.com"}
                            </p>
                        </div>
                    </div>
                    <UserSettingsDialog user={user} updateUser={updateUser} />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 border-b">
                        <FriendRequests />
                    </div>

                    <div className="p-4 border-b">
                        <AddFriendDialog />
                    </div>

                    <FriendsList friends={friends} />
                </div>
            </div>
            <div className="p-4 border-t">
                <Button
                    onClick={onLogout}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
