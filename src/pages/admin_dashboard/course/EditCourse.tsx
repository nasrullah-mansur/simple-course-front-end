import EditCourseForm from "@/components/modules/course/EditCourseForm";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function EditCourse() {
    return (
        <div className="py-14 flex items-center justify-center ">
            <div className="max-w-xl w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card">

                <p className="text-xl font-semibold tracking-tight">
                    Edit your course
                </p>

                <div className="my-3 w-full flex items-center justify-center overflow-hidden">
                    <Separator />

                </div>
                <EditCourseForm />

            </div>
        </div>
    )
}
