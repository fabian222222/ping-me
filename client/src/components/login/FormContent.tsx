import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

interface FormContentProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const FormContent = ({
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
}: FormContentProps) => {
    return (
        <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </form>
        </CardContent>
    );
};

export default FormContent;
