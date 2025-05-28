import { Zap, Shield, Users } from "lucide-react";
import React from "react";

const WhyUsSection = () => {
    return (
        <section className="py-16 bg-white rounded-lg shadow-sm my-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Why Choose ping-me?</h2>
                <p className="text-slate-600 mt-2">
                    The most user-friendly chat platform available
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 px-4">
                <div className="text-center p-6">
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        Lightning Fast
                    </h3>
                    <p className="text-slate-600">
                        Experience real-time messaging with zero lag. Stay
                        connected instantly.
                    </p>
                </div>

                <div className="text-center p-6">
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Secure Chats</h3>
                    <p className="text-slate-600">
                        All messages are encrypted end-to-end. Your privacy is
                        our priority.
                    </p>
                </div>

                <div className="text-center p-6">
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Group Chats</h3>
                    <p className="text-slate-600">
                        Create group conversations and stay connected with
                        multiple friends at once.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;
