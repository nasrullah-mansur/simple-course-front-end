import { Button } from "@/components/ui/button";
import { envVars } from "@/config/env";
import { useCourseViewQuery } from "@/redux/modules/course/course.api";
import { useEnrollMutation } from "@/redux/modules/enroll/enroll.api";
import { authToken } from "@/utils/authToken";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function CourseDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const [enroll] = useEnrollMutation();
    const token = authToken.getTokenFromLocalStorage();


    const enrollHandler = async (id: string) => {

        if (!token) {
            toast.error("Please login before enrollment");
            navigate('/login');
            return;
        }


        try {
            await enroll(id).unwrap();
            toast.success("Enrollment successfully");
            navigate("/me/my-courses");
        } catch (error) {
            toast.error("Sorry you have already enrolled")
            console.log(error);

        }
    }


    const { data, isLoading } = useCourseViewQuery(params.id);

    return (
        <div className="my-16 p-4 border max-w-screen-sm mx-auto">
            {isLoading && <div className="text-center py-6 font-semibold">Course is loading ...</div>}

            {!isLoading && data &&
                <div>
                    <img className="w-full" src={envVars.VITE_ASSET_URL + "/" + data.data.image} alt="" />
                    <h4 className="text-xl font-medium py-3">{data.data.title}</h4>
                    <p>{data.data.details}</p>


                    <Button onClick={() => enrollHandler(data.data.id)} className="w-full mt-6 cursor-pointer">Enroll Now</Button>
                </div>

            }

        </div>
    )
}
