import { API_URL } from "@/constants/api";
import { LoginCredentials, AuthResponse } from "@/types/auth";

export const login = async (
    credentials: LoginCredentials
): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (
    token: string
): Promise<AuthResponse["user"]> => {
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get profile");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async (token: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
