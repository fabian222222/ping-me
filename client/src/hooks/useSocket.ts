import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "@/providers/AuthProvider";
import { API_URL } from "@/constants/api";

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }

        if (user?.id) {
            socketRef.current = io(API_URL, {
                query: {
                    userId: user.id,
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            socketRef.current.on("connect", () => {
                console.log(
                    "Connected to WebSocket server with socket id:",
                    socketRef.current?.id
                );
            });

            socketRef.current.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
            });

            socketRef.current.on("disconnect", (reason) => {
                console.log("Disconnected from WebSocket server:", reason);
            });

            socketRef.current.on("reconnect", (attemptNumber) => {
                console.log(
                    "Reconnected to WebSocket server after",
                    attemptNumber,
                    "attempts"
                );
            });

            socketRef.current.on("reconnect_error", (error) => {
                console.error("WebSocket reconnection error:", error);
            });
        }

        return () => {
            if (socketRef.current) {
                console.log("Cleaning up socket connection");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [user?.id]);

    return socketRef.current;
};
