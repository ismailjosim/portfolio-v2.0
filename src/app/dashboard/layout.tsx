import React from 'react'

import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'
import { AppSidebar } from '../../components/app-sidebar'

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='container mx-auto'>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )


}

export default DashboardLayout
