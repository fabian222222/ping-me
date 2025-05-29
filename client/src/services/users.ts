import axios from "axios";
import { User } from "../types/user";
import { API_URL } from "../constants/api";

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
