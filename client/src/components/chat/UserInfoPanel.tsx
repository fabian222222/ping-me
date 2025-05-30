"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { User } from "@/types/user";

interface UserInfoPanelProps {
    user: User;
    onClose: () => void;
}

const UserInfoPanel = ({ user, onClose }: UserInfoPanelProps) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Informations</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 p-4 space-y-6">
                <div className="text-center">
                    <UserAvatar
                        user={user}
                        className="h-20 w-20 mx-auto mb-3"
                        showStatus={true}
                        status={user.status}
                    />
                    <h4 className="font-semibold text-lg">
                        {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-sm text-slate-500 capitalize">
                        {user.status}
                    </p>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-slate-500">
                            Email
                        </label>
                        <p className="text-sm">
                            {user.email || "Non renseigné"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPanel;
