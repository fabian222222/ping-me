import React from "react";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold text-primary flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                ping-me
            </div>
            <div className="space-x-4">
                <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
