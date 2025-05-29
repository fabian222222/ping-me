"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthState, AuthResponse, LoginCredentials } from "@/types/auth";

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => void;
    loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();

    useEffect(() => {
        auth.loadUser();
    }, [auth.loadUser]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
