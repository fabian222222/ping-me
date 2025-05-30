"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthState, AuthResponse, LoginCredentials } from "@/types/auth";

interface UpdateUserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => void;
    loadUser: () => Promise<void>;
    updateUser: (data: UpdateUserData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();

    useEffect(() => {
        auth.loadUser();
    }, [auth.loadUser]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
