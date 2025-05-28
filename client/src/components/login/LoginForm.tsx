import React from "react";
import { Card } from "../ui/card";
import FormContent from "./FormContent";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    isLoading: boolean;
}

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
}: LoginFormProps) => {
    return (
        <Card className="w-full max-w-md">
            <FormHeader />
            <FormContent
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                isLoading={isLoading}
            />
            <FormFooter />
        </Card>
    );
};

export default LoginForm;
