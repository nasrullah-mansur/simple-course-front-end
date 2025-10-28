import { Button } from "@/components/ui/button";
import { envVars } from "@/config/env";
import { useAppSelector } from "@/redux/hook";
import { useMyCourseQuery } from "@/redux/modules/course/course.api";
import { Link } from "react-router";

export default function MyCourses() {
    const user = useAppSelector(store => store.loginUser);

    const { data, isLoading } = useMyCourseQuery(undefined);

    return (
        <div>
            <div className="text-center pt-14 pb-6">
                <h1 className="text-2xl font-bold">Hello {user.name}</h1>
                <p>Your Courses List</p>
            </div>

            {isLoading && <div className="text-center py-6 font-semibold">Course is loading ...</div>}

            {!isLoading && data && data.data.courses.length == 0 &&
                <div className="text-center py-6 font-semibold">
                    <p>You did not enroll any course yet. Please enroll first.</p>
                    <Button asChild className="mt-2">
                        <Link to={"/"}>View Courses</Link>
                    </Button>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-14">

                {!isLoading && data &&


                    data.data.courses.map((course: { id: string; image: string; title: string }) => (
                        <div className="border rounded" key={course.id}>
                            <img className="w-full" src={envVars.VITE_ASSET_URL + "/" + course.image} alt="" />
                            <h4 className="text-xl font-medium p-3">{course.title}</h4>

                            <div className="m-3">
                                <Button asChild className="w-full cursor-pointer">
                                    <Link to={`/course-details/${course.id}`}>Course Details</Link>
                                </Button>
                            </div>
                        </div>

                    ))

                }

            </div>
        </div>
    )
}
