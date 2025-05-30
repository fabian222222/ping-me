"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import RegisterForm from "../register/RegisterForm";
import { RegisterFormData, registerSchema } from "@/schemas/auth.schema";
import { createUser } from "@/services/users.service";

const RegisterUi = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        try {
            await createUser(data);

            toast({
                title: "Success",
                description: "Account created successfully!",
            });
            router.push("/");
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

        try {
            toast({
                title: "Success",
                description: "Registered with Google!",
            });
            router.push("/");
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
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                isLoading={isLoading}
                handleGoogleRegister={handleGoogleRegister}
            />
        </div>
    );
};

export default RegisterUi;
