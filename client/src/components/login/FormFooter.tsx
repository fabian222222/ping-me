import Link from "next/link";
import { CardFooter } from "../ui/card";

const FormFooter = () => {
    return (
        <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                    Register
                </Link>
            </div>
            <div className="text-center text-sm">
                <Link href="/" className="text-slate-500 hover:underline">
                    Back to home
                </Link>
            </div>
        </CardFooter>
    );
};

export default FormFooter;
