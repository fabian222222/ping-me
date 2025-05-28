import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const SignUpReminder = () => {
    return (
        <section className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
                Ready to start chatting?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of users already enjoying ping-me&apos;s seamless
                communication experience.
            </p>
            <Button size="lg" asChild>
                <Link href="/register">Sign Up Now</Link>
            </Button>
        </section>
    );
};

export default SignUpReminder;
