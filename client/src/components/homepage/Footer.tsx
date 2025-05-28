import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="mt-16 text-center text-slate-500 text-sm border-t border-slate-200 pt-8 pb-4">
            <p className="mb-2">© 2025 ping-me. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
                <Link href="#" className="hover:text-primary">
                    Privacy
                </Link>
                <Link href="#" className="hover:text-primary">
                    Terms
                </Link>
                <Link href="#" className="hover:text-primary">
                    Contact
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
