import React from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Mail, MessageSquare } from "lucide-react";

const FormHeader = () => {
    return (
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <div className="text-xl font-bold text-primary flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    ping-me
                </div>
            </div>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your credentials to access your account
            </CardDescription>

            <div className="!my-4">
                <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 justify-center"
                >
                    <Mail className="h-4 w-4" />
                    Continue with Google
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
        </CardHeader>
    );
};

export default FormHeader;
