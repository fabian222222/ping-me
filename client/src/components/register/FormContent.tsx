import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/schemas/auth.schema";

interface FormContentProps {
    register: UseFormRegister<RegisterFormData>;
    onSubmit: (e: React.FormEvent) => void;
    errors: FieldErrors<RegisterFormData>;
    isLoading: boolean;
}

const FormContent = ({
    register,
    onSubmit,
    errors,
    isLoading,
}: FormContentProps) => {
    return (
        <CardContent className="space-y-4">
            <form onSubmit={onSubmit}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                {...register("firstName")}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                {...register("lastName")}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                        <p className="text-sm text-gray-500">
                            Only letters, numbers, underscores and hyphens
                            allowed
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Register"}
                    </Button>
                </div>
            </form>
        </CardContent>
    );
};

export default FormContent;
