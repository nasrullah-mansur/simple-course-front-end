/* eslint-disable @typescript-eslint/no-explicit-any */

import ImageUpload from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { envVars } from "@/config/env"
import { useCourseViewQuery, useUpdateCourseMutation } from "@/redux/modules/course/course.api"
import { blobUrlToImage } from "@/utils/blobUrlToImage"
import { handleServerError } from "@/utils/handleServerFormError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z
    .object({
        title: z.string().min(1, "Title is required"),
        details: z
            .string()
            .min(1, "Details is required"),
        image: z
            .string()
            .min(1, "Image is required"),

    })

type FormSchema = z.infer<typeof formSchema>;


export default function EditCourseForm() {
    const navigate = useNavigate();

    const params = useParams();

    const { data, isLoading } = useCourseViewQuery(params.id);

    const [updateCourse] = useUpdateCourseMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            details: "",
            image: "",
        },
    })

    useEffect(() => {

        type ICourse = {
            title: string;
            details: string;
            image: string;
        };

        if (data) {
            const defaultValues: ICourse = {
                title: data.data.title ?? "",
                details: data.data.details ?? "",
                image: data.data.image
                    ? `${envVars.VITE_ASSET_URL}/${data.data.image}`
                    : "",
            };

            (Object.keys(defaultValues) as (keyof ICourse)[]).forEach((key) => {
                form.setValue(key, defaultValues[key] ?? "");
            });
        }

    }, [data, form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        const formData = new FormData();
        let image: any;

        if (data['image']) {
            image = await blobUrlToImage(data['image'] as any)
        }

        (Object.keys(data) as (keyof FormSchema)[]).forEach((key) => {
            const value = data[key];
            if (!value) return;
            if (key === 'image') {
                formData.append('image', image);
            }
            formData.append(key, value);
        });

        try {
            const res = await updateCourse({ formData, id: params.id }).unwrap();
            toast.success(res.message);
            navigate('/admin/courses')

        } catch (error: any) {
            handleServerError(form, error);
            toast.error("Something is wrong, Please check the form again");
        }
    }

    return (
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>

            {isLoading && <div className="text-center py-6">Loading form ...</div>}

            {!isLoading && data &&
                <>
                    <div className="mb-3">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Course Title</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Course Title"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <Controller
                            name="details"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Course Details</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Course details"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="mb-3">
                        <Controller
                            name="image"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Course Image</FieldLabel>
                                    <ImageUpload {...field} />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>

                    <div>
                        <Button className="w-full cursor-pointer">Set Course</Button>
                    </div>
                </>

            }


        </form>
    )
}
