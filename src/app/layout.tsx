import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'
import { TooltipProvider } from '../components/ui/tooltip'
import { ThemeProvider } from '../providers/theme-provider'

export const metadata: Metadata = {
	title: 'JASIM - Full Stack Developer & Instructor',
	description: 'Full Stack Developer | Programmer | Instructor',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<TooltipProvider>
						{children}

						<Toaster position='top-right' richColors />
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
