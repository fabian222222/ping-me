"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserAvatar as UserAvatarType } from "@/types/user";

interface UserAvatarProps {
    user: UserAvatarType;
    className?: string;
    showStatus?: boolean;
    status: "ONLINE" | "OFFLINE" | "INVISIBLE";
}

const UserAvatar = ({
    user,
    className,
    showStatus = false,
    status,
}: UserAvatarProps) => {
    const getStatusColor = (status: "ONLINE" | "OFFLINE" | "INVISIBLE") => {
        const colors = {
            ONLINE: "bg-green-500",
            OFFLINE: "bg-gray-500",
            INVISIBLE: "bg-yellow-500",
        };
        return colors[status];
    };
    const firstNameInitial = user.firstName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    const lastNameInitial = user.lastName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const initials = firstNameInitial + lastNameInitial;

    return (
        <div className="relative">
            <Avatar className={cn("border border-slate-200", className)}>
                {/* <AvatarImage src={user.avatar} alt={user.firstName} /> */}
                <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                </AvatarFallback>
            </Avatar>
            {showStatus && (
                <span
                    className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                        getStatusColor(status)
                    )}
                ></span>
            )}
        </div>
    );
};

export default UserAvatar;
