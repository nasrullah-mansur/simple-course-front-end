import LoginForm from "@/components/modules/auth/LoginForm";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { NavLink } from "react-router";

export default function Register() {
    return (
        <div className="py-14 flex items-center justify-center ">
            <div className="max-w-sm w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card">

                <p className="text-xl font-semibold tracking-tight">
                    Log In
                </p>

                <div className="my-3 w-full flex items-center justify-center overflow-hidden">
                    <Separator />

                </div>
                <LoginForm />
                <p className="mt-5 text-sm text-center">
                    Do not have account? <NavLink to="/register" className="underline">Register</NavLink>
                </p>
            </div>
        </div>
    )
}
