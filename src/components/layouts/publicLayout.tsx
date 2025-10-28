import Footer from '@/components/shared_sections/public/Footer'
import MainLayout from '@/components/shared_sections/public/MainLayout'
import Navbar from '@/components/shared_sections/public/navbar/navbar'
import { Outlet } from 'react-router'

export default function PublicLayout() {
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
