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
			<SidebarTrigger className={'relative -left-2 top-2 z-10'} />
			<main>{children}</main>
		</SidebarProvider>
	)
}

export default DashboardLayout
