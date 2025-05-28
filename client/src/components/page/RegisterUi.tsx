"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";
import RegisterForm from "../register/RegisterForm";

const RegisterUi = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        // Mock registration - will be replaced with actual authentication
        try {
            // Simulating API request
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // For demo purposes - always succeeds
            toast({
                title: "Success",
                description: "Account created successfully!",
            });
            router.push("/chat");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to register. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setIsLoading(true);

        // Mock Google registration
        try {
            // Simulating API request
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast({
                title: "Success",
                description: "Registered with Google!",
            });
            router.push("/chat");
        } catch (error) {
            toast({
                title: "Error",
                description: "Google registration failed. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                isLoading={isLoading}
                handleGoogleRegister={handleGoogleRegister}
            />
        </div>
    );
};

export default RegisterUi;
