import axios from "axios";
import { User } from "../types/user";
import { API_URL } from "../constants/api";
import { AuthResponse } from "@/types/auth";
import { getToken } from "@/lib/utils";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const createUser = async (userData: User) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    "Une erreur est survenue lors de la création de l'utilisateur"
            );
        }
        throw new Error(
            "Une erreur est survenue lors de la création de l'utilisateur"
        );
    }
};

export const updateUser = async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}): Promise<AuthResponse["user"]> => {
    try {
        const response = await axiosInstance.put(`/users`, data);

        return response.data;
    } catch (error) {
        throw error;
    }
};
