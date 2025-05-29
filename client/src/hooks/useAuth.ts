import { useState, useCallback } from "react";
import { getProfile, login, refreshToken } from "@/services/auth.service";
import { LoginCredentials, AuthState } from "@/types/auth";
import { useRouter } from "next/navigation";
import { setToken, getToken, removeToken, isAuthenticated } from "@/lib/utils";

export const useAuth = () => {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: getToken(),
        isAuthenticated: isAuthenticated(),
    });

    const handleLogin = useCallback(
        async (credentials: LoginCredentials) => {
            try {
                const response = await login(credentials);
                setToken(response.access_token);
                setAuthState({
                    user: response.user,
                    token: response.access_token,
                    isAuthenticated: true,
                });
                router.push("/");
                return response;
            } catch (error) {
                console.error("Login error:", error);
                throw error;
            }
        },
        [router]
    );

    const handleLogout = useCallback(() => {
        removeToken();
        setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
        });
        router.push("/login");
    }, [router]);

    const loadUser = useCallback(async () => {
        const token = getToken();
        if (!token) return;

        try {
            const user = await getProfile(token);
            setAuthState((prev) => ({
                ...prev,
                user,
                isAuthenticated: true,
            }));
        } catch (error) {
            try {
                const refreshResponse = await refreshToken(token);
                setToken(refreshResponse.access_token);
                const user = await getProfile(refreshResponse.access_token);
                setAuthState({
                    user,
                    token: refreshResponse.access_token,
                    isAuthenticated: true,
                });
            } catch (refreshError) {
                handleLogout();
            }
        }
    }, [handleLogout]);

    return {
        ...authState,
        login: handleLogin,
        logout: handleLogout,
        loadUser,
    };
};
