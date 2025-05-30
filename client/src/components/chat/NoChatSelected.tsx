import { MessageCircle, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoChatSelected() {
    return (
        <div className="h-screen flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <div className="max-w-md mx-auto space-y-6">
                <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 text-slate-400" />
                </div>

                <h2 className="text-2xl font-semibold text-slate-700">
                    Sélectionnez une conversation
                </h2>

                <p className="text-slate-500 leading-relaxed">
                    Choisissez un ami dans la liste de gauche pour commencer à
                    discuter ou retournez à la page d'accueil.
                </p>

                <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-600">
                            Vos amis apparaissent à gauche
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-slate-600">
                            Cliquez pour commencer à discuter
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
