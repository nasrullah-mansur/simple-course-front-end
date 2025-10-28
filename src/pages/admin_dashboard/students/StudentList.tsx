import SimplePaginate from "@/components/simple-pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useStudentsQuery } from "@/redux/modules/student/student.api";
import { useState } from "react";


export default function StudentList() {
    const [page, setPage] = useState(1);


    const { data, isLoading } = useStudentsQuery(page);




    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Student with courses List</h1>


            <div>
                <Table className="border">

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Total Enrollment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {isLoading &&
                            <TableRow>
                                <TableCell colSpan={4} className="font-medium text-center">Data is loading ...</TableCell>
                            </TableRow>
                        }

                        {!isLoading && data &&
                            data.data.data.map((student: { id: number; name: string; email: string; courses: [] }) => (
                                <TableRow key={student.id}>
                                    <TableCell >
                                        {student.name}
                                    </TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.courses ? student.courses.length : "0"}</TableCell>

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
