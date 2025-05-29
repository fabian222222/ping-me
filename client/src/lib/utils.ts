import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const setToken = (token: string): void => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

export const removeToken = (): void => {
    localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
