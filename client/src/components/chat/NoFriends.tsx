import { UserPlus, MessageCircle, Users } from "lucide-react";
import AddFriendDialog from "./AddFriendDialog";

const NoFriends = () => {
    return (
        <div className="h-screen flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-slate-400" />
                </div>

                <h2 className="text-2xl font-semibold text-slate-700">
                    Commencez à discuter !
                </h2>

                <p className="text-slate-500 leading-relaxed">
                    Vous n'avez pas encore d'amis dans votre liste. Ajoutez des
                    amis pour commencer à discuter et partager des moments
                    ensemble.
                </p>

                <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-600">
                            Ajoutez des amis par son pseudo
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-slate-600">
                            Discutez en temps réel
                        </span>
                    </div>
                </div>

                <div className="pt-4">
                    <AddFriendDialog />
                </div>
            </div>
        </div>
    );
};

export default NoFriends;
