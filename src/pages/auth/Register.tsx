import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { NavLink } from "react-router";

export default function Register() {
    return (
        <div className="py-14 flex items-center justify-center ">
            <div className="max-w-sm w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card">

                <p className="text-xl font-semibold tracking-tight">
                    Register
                </p>

                <div className="my-3 w-full flex items-center justify-center overflow-hidden">
                    <Separator />

                </div>
                <RegisterForm />
                <p className="mt-5 text-sm text-center">
                    Already have an account? <NavLink to="/login" className="underline">Log in</NavLink>
                </p>
            </div>
        </div>
    )
}
