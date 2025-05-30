import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
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
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UserAvatar from "./UserAvatar";
import { useForm } from "react-hook-form";
import { updateUser as updateUserService } from "@/services/users.service";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthResponse } from "@/types/auth";

const userSettingsSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    firstName: z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

export default function UserSettingsDialog({
    user,
    updateUser,
}: {
    user: AuthResponse["user"];
    updateUser: (data: AuthResponse["user"]) => Promise<void>;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserSettingsFormData>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            name: user?.username || "",
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
        },
    });

    const onSubmit = async (data: UserSettingsFormData) => {
        try {
            const updatedUser = await updateUserService({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.name,
                email: data.email,
            });

            updateUser(updatedUser);

            toast({
                title: "Profil mis à jour",
                description:
                    "Vos informations ont été sauvegardées avec succès.",
            });
            setIsOpen(false);
        } catch (error) {
            toast({
                title: "Erreur",
                description:
                    "Une erreur est survenue lors de la mise à jour du profil.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Paramètres du profil</DialogTitle>
                    <DialogDescription>
                        Modifiez vos informations personnelles ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-center">
                            <UserAvatar
                                user={
                                    user || {
                                        id: "",
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        avatar: "",
                                    }
                                }
                                className="h-16 w-16"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                id="firstName"
                                {...register("firstName")}
                                className={
                                    errors.firstName ? "border-red-500" : ""
                                }
                                placeholder={user?.firstName || ""}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                id="lastName"
                                {...register("lastName")}
                                className={
                                    errors.lastName ? "border-red-500" : ""
                                }
                                placeholder={user?.lastName || ""}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom d'utilisateur</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                                placeholder={user?.username || ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                                placeholder={user?.email || ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
