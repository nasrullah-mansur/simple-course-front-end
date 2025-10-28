import { type ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className=" flex-1 w-full ">
            <div className="max-w-(--breakpoint-xl) mx-auto sm:px-4">
                {children}
            </div>
        </div>
    )
}
