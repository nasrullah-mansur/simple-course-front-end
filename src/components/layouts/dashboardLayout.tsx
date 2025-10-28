import Navbar from '@/components/shared_sections/dashboard/navbar'
import Footer from '@/components/shared_sections/public/Footer'
import MainLayout from '@/components/shared_sections/public/MainLayout'

import { Outlet } from 'react-router'

export default function DashboardLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <MainLayout>
                <Outlet />
            </MainLayout>
            <Footer />
        </div>
    )
}
