// sidebar-collapsed-logo.tsx
import Image from 'next/image'

export function SidebarCollapsedLogo() {
	return (
		<div
			className='
        absolute inset-0 flex items-center justify-center
        opacity-0 scale-75
        transition-all duration-300
        pointer-events-none
        group-data-[collapsible=icon]:opacity-100
        group-data-[collapsible=icon]:scale-100
        group-data-[collapsible=icon]:pointer-events-auto
      '
		>
			<Image
				src='/person.jpeg'
				alt='logo'
				width={32}
				height={32}
				style={{ width: 'auto', height: 'auto' }}
			/>
		</div>
	)
}
