import Link from "next/link";
import { CardFooter } from "../ui/card";

const FormFooter = () => {
    return (
        <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                    Login
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
