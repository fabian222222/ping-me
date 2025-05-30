import { AuthResponse } from "./auth";

export type User = AuthResponse["user"];
export type UserWithoutPassword = Omit<User, "password">;
export type UserAvatar = Pick<User, "firstName" | "lastName" | "email">;
