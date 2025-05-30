"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFriends } from "@/providers/FriendsProvider";
import { sendFriendRequest } from "@/services/friends.service";

const AddFriendDialog = () => {
    const [identifier, setIdentifier] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { loadPendingRequests } = useFriends();

    const handleAddFriend = async () => {
        if (!identifier.trim()) return;

        setIsLoading(true);
        try {
            await sendFriendRequest(identifier.trim());
            await loadPendingRequests();

            toast({
                title: "Demande d'ami envoyée",
                description: `Une demande d'ami a été envoyée à ${identifier}`,
            });
            setIdentifier("");
            setIsOpen(false);
        } catch (error: any) {
            toast({
                title: "Erreur",
                description:
                    error.response?.data?.message ||
                    "Impossible d'envoyer la demande d'ami. Veuillez réessayer.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter un ami
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un ami</DialogTitle>
                    <DialogDescription>
                        Entrez l'email ou le nom d'utilisateur de la personne
                        que vous souhaitez ajouter.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        type="text"
                        placeholder="email@exemple.com ou nom d'utilisateur"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" && handleAddFriend()
                        }
                    />
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleAddFriend}
                        disabled={!identifier.trim() || isLoading}
                    >
                        {isLoading ? "Envoi..." : "Envoyer la demande"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddFriendDialog;
