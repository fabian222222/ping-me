"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuthContext } from "@/providers/AuthProvider";
import Sidebar from "@/components/common/Sidebar";
import { FriendsProvider } from "@/providers/FriendsProvider";
import { MessagesProvider } from "@/providers/MessagesProvider";
import { SocketProvider } from "@/providers/SocketProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, logout } = useAuthContext();

    if (!isAuthenticated) {
        return children;
    }

    return (
        <div className="flex h-screen">
            <div className="w-80 flex-shrink-0">
                <Sidebar onLogout={logout} />
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <AuthProvider>
                    <MessagesProvider>
                        <FriendsProvider>
                            <SocketProvider>
                                <Toaster />
                                <MainContent>{children}</MainContent>
                            </SocketProvider>
                        </FriendsProvider>
                    </MessagesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
