"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useMessages } from "@/providers/MessagesProvider";

interface ChatInputProps {
    receiverId: string;
}

const ChatInput = ({ receiverId }: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const { createMessage } = useMessages();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                await createMessage({
                    content: message.trim(),
                    receiverId: receiverId,
                });
                setMessage("");
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex items-end gap-2">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message..."
                    className="min-h-[60px] resize-none"
                />
                <Button type="submit" size="icon" disabled={!message.trim()}>
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </form>
    );
};

export default ChatInput;
