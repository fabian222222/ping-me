export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        avatar?: string;
        bio?: string;
        createdAt: string;
        discordId?: string;
        email: string;
        emailVerified: false;
        firstName: string;
        githubId?: string;
        googleId?: string;
        id: string;
        lastName: string;
        messageColor: string;
        resetToken?: string;
        resetTokenExpiry?: string;
        status: UserStatus;
        twoFactorEnabled: false;
        twoFactorSecret?: string;
        updatedAt: string;
        username: string;
        verificationToken?: string;
    };
}

export enum UserStatus {
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
}

export interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    isAuthenticated: boolean;
}
