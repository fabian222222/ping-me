import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Card } from "../ui/card";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import { RegisterFormData } from "@/schemas/auth.schema";

interface RegisterFormProps {
    register: UseFormRegister<RegisterFormData>;
    onSubmit: (e: React.FormEvent) => void;
    errors: FieldErrors<RegisterFormData>;
    isLoading: boolean;
    handleGoogleRegister: () => void;
}

const RegisterForm = ({
    register,
    onSubmit,
    errors,
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
                register={register}
                onSubmit={onSubmit}
                errors={errors}
                isLoading={isLoading}
            />
            <FormFooter />
        </Card>
    );
};

export default RegisterForm;
