"use client";
import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";
import ChatUi from "@/components/page/ChatUi";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/homepage");
        }
    }, [router]);

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <div>
            <ChatUi />
        </div>
    );
}
