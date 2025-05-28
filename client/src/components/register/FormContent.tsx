import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";

interface FormContentProps {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleRegister: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const FormContent = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    isLoading,
}: FormContentProps) => {
    return (
        <CardContent className="space-y-4">
            <form onSubmit={handleRegister}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(e.target.value);
                            }}
                            required
                        />
                    </div>
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
                        <Label htmlFor="password">Password</Label>
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
                        {isLoading ? "Creating account..." : "Register"}
                    </Button>
                </div>
            </form>
        </CardContent>
    );
};

export default FormContent;
