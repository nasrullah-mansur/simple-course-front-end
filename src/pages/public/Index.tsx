import SimplePaginate from "@/components/simple-pagination";
import { Button } from "@/components/ui/button";
import { envVars } from "@/config/env";
import { useCoursesQuery } from "@/redux/modules/course/course.api";
import { useState } from "react";
import { Link } from "react-router";

export default function Index() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useCoursesQuery(page);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center pt-12 mb-12">Our Courses</h1>


            {isLoading && <div className="text-center py-6 font-semibold">Course is loading ...</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-14">

                {!isLoading && data &&

                    data.data.data.map((course: { id: string; image: string; title: string }) => (
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

            {!isLoading && data &&
                <SimplePaginate onClick={(n: number) => setPage(n)} links={data.data.links} />
            }
        </div>
    )
}
