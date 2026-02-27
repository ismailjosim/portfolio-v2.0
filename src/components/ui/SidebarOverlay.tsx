'use client'

export default function SidebarOverlay() {
	const closeSidebar = () => {
		const sidebar = document.getElementById('sidebar')
		const overlay = document.getElementById('sidebar-overlay')
		sidebar?.classList.remove('open')
		overlay?.classList.remove('show')
	}

	return <div id='sidebar-overlay' onClick={closeSidebar} />
}
