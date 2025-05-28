import React from "react";
import { Card } from "../ui/card";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";

interface RegisterFormProps {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleRegister: (e: React.FormEvent) => void;
    isLoading: boolean;
    handleGoogleRegister: () => void;
}

const RegisterForm = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    isLoading,
    handleGoogleRegister,
}: RegisterFormProps) => {
    return (
        <Card className="w-full max-w-md">
            <FormHeader
                handleGoogleRegister={handleGoogleRegister}
                isLoading={isLoading}
            />
            <FormContent
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                isLoading={isLoading}
            />
            <FormFooter />
        </Card>
    );
};

export default RegisterForm;
