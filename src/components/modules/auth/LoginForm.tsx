/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/redux/modules/auth/auth.api"
import { authToken } from "@/utils/authToken"
import { handleServerError } from "@/utils/handleServerFormError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(3, "Password must be at least 3 characters"),
    })

export default function LoginForm() {
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await login(data).unwrap();
            toast.success(res.message);

            if (res.role == "student") {
                navigate('/me')
            } else {
                navigate('/admin')
            }

            authToken.setTokenToLocalStorage(res.token);

        } catch (error: any) {
            handleServerError(form, error);
            toast.error("Something is wrong, Please check the form again");
        }

    }

    return (
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="mb-3">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Email"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>

            <div className="mb-3">
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Password"
                                type="password"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>



            <div>
                <Button className="w-full cursor-pointer">Login</Button>
            </div>
        </form>
    )
}
