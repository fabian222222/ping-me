export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name?: string;
    };
}

export interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    isAuthenticated: boolean;
}
