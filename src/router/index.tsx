import DashboardLayout from "@/components/layouts/dashboardLayout";
import PublicLayout from "@/components/layouts/publicLayout";
import CourseList from "@/pages/admin_dashboard/course/CourseList";
import CreateCourse from "@/pages/admin_dashboard/course/CreateCourse";
import EditCourse from "@/pages/admin_dashboard/course/EditCourse";
import Dashboard from "@/pages/admin_dashboard/Dashboard";
import EnrollmentList from "@/pages/admin_dashboard/enrollment/EnrollmentList";
import StudentList from "@/pages/admin_dashboard/students/StudentList";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import MyCourses from "@/pages/my_courses/MyCourses";
import CourseDetails from "@/pages/public/CourseDetails";
import Index from "@/pages/public/Index";
import { withAuth } from "@/utils/withAuthCheck";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        children: [
            {
                Component: Index,
                index: true
            },
            {
                path: "/course-details/:id",
                Component: CourseDetails
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/login",
                Component: Login,
            },

        ],
    },
    {
        path: "/me",
        Component: withAuth(PublicLayout, 'student'),
        children: [
            {
                element: <Navigate to="/me/my-courses" />,
                index: true
            },
            {
                path: "my-courses",
                Component: MyCourses
            }

        ],
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, 'admin'),
        children: [
            {
                element: <Navigate to="/admin/dashboard" />,
                index: true
            },
            {
                path: "dashboard",
                Component: Dashboard
            },
            {
                path: "courses",
                Component: CourseList,
            },
            {
                path: "create-course",
                Component: CreateCourse,
            },
            {
                path: "edit-course/:id",
                Component: EditCourse
            },
            {
                path: "students",
                Component: StudentList,
            },
            {
                path: "enrollment",
                Component: EnrollmentList,
            },

        ],
    },

])