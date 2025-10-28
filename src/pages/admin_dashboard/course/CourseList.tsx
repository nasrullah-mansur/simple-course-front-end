import SimplePaginate from "@/components/simple-pagination";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { envVars } from "@/config/env";
import { useCoursesQuery, useDeleteCourseMutation } from "@/redux/modules/course/course.api";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";


export default function CourseList() {
    const [page, setPage] = useState(1);

    const [deleteCourse] = useDeleteCourseMutation();

    const { data, isLoading } = useCoursesQuery(page);


    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete it?")) return;

        try {
            await deleteCourse(id).unwrap();
            toast.success("Course removed successfully")
        } catch (error) {
            console.log(error);

        }


    }


    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Course with enrollment List</h1>
            <Button asChild className="cursor-pointer mb-3">
                <Link to="/admin/create-course">Create Course</Link>
            </Button>

            <div>
                <Table className="border">

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Image</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Total Enrollment</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {isLoading &&
                            <TableRow>
                                <TableCell colSpan={4} className="font-medium text-center">Data is loading ...</TableCell>
                            </TableRow>
                        }

                        {!isLoading && data &&
                            data.data.data.map((course: { id: number; image: string; title: string; students: [] | null }) => (
                                <TableRow key={course.id}>
                                    <TableCell >
                                        <img className="w-[90px]" src={envVars.VITE_ASSET_URL + "/" + course.image} alt={course.title} />
                                    </TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.students ? course.students.length : "0"}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="inline-flex gap-x-2">
                                            <Button asChild variant="default" className="cursor-pointer">
                                                <Link to={`/admin/edit-course/${course.id}`}><SquarePen /></Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(course.id)} variant="destructive" className="cursor-pointer">
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>

                </Table>

                {!isLoading && data &&
                    <SimplePaginate onClick={(n: number) => setPage(n)} links={data.data.links} />
                }
            </div>
        </div>
    )
}
