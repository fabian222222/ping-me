"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoginForm from "../login/LoginForm";

const LoginUi = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        // Mock login - will be replaced with actual authentication
        try {
            // Simulating API request
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // For demo purposes - always succeeds
            toast({
                title: "Success",
                description: "Welcome back!",
            });
            router.push("/chat");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to login. Please try again.",
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
