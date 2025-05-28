import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
    return (
        <section className="grid md:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Connect with friends in real time
                </h1>
                <p className="text-lg text-slate-600">
                    Experience seamless conversations with our intuitive chat
                    platform. Stay connected with friends and colleagues
                    wherever you are.
                </p>
                <div className="pt-4">
                    <Button size="lg" asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border">
                    <div className="p-6 bg-primary/5">
                        <div className="font-semibold mb-2">
                            Live Chat Preview
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                                    SJ
                                </div>
                                <div className="bg-slate-100 rounded-lg p-3 text-sm max-w-[80%]">
                                    Hey there! Welcome to our chat app 👋
                                </div>
                            </div>
                            <div className="flex items-start gap-3 justify-end">
                                <div className="bg-primary text-white rounded-lg p-3 text-sm max-w-[80%]">
                                    Thanks! This looks awesome!
                                </div>
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white">
                                    ME
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
