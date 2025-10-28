import { useAppSelector } from "@/redux/hook";
import { useDashboardQuery } from "@/redux/modules/dashboard/dashboard.api";

export default function Dashboard() {
    const user = useAppSelector(store => store.loginUser);

    const { data } = useDashboardQuery(undefined);

    console.log(data);


    return (
        <div>
            <div className="text-center pt-14 pb-6 mb-6">
                <h1 className="text-2xl font-bold">Hello {user.name}</h1>
                <p>Welcome to dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-14">
                <div className="border rounded text-center p-4">
                    <h4 className="text-2xl font-bold">Total Student</h4>
                    <p>{data ? data.data.student : "N/A"}</p>
                </div>

                <div className="border rounded text-center p-4">
                    <h4 className="text-2xl font-bold">Total Course</h4>
                    <p>{data ? data.data.course : "N/A"}</p>
                </div>

                <div className="border rounded text-center p-4">
                    <h4 className="text-2xl font-bold">Total Enrollment</h4>
                    <p>{data ? data.data.enroll : "N/A"}</p>
                </div>

            </div>
        </div>
    )
}
