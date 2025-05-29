"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "../login/LoginForm";
import { useAuthContext } from "@/providers/AuthProvider";

const LoginUi = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthContext();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: "Error",
                description: "Veuillez remplir tous les champs",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await login({
                email,
                password,
            });

            toast({
                title: "Succès",
                description: "Connexion réussie !",
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Échec de la connexion. Veuillez réessayer.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                isLoading={isLoading}
            />
        </div>
    );
};

export default LoginUi;
