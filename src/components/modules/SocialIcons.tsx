import { Mail, Github, Linkedin, Facebook, X, Phone, MessageCircleMore } from 'lucide-react'
import { Button } from '../ui/button'

type SocialButtonProps = {
	href: string
	label: string
	icon: React.ElementType
}

function SocialButton({ href, label, icon: Icon }: SocialButtonProps) {
	const isExternal = href.startsWith('http')

	return (
		<Button
			asChild
			size='icon'
			className='h-9 w-9 rounded-lg border border-border text-muted-foreground bg-transparent transition-all duration-200 hover:bg-accent hover:text-white hover:border-accent'
		>
			<a
				href={href}
				target={isExternal ? '_blank' : undefined}
				rel={isExternal ? 'noopener noreferrer' : undefined}
				title={label}
			>
				<Icon className='w-4 h-4' />
			</a>
		</Button>
	)
}

const SocialIcons = {
	Email: () => (
		<SocialButton
			href='mailto:ismailjosim@yahoo.com'
			label='Email'
			icon={Mail}
		/>
	),

	Github: () => (
		<SocialButton
			href='https://github.com/ismailjosim'
			label='GitHub'
			icon={Github}
		/>
	),

	Linkedin: () => (
		<SocialButton
			href='https://www.linkedin.com/in/ismailjosim/'
			label='LinkedIn'
			icon={Linkedin}
		/>
	),

	Facebook: () => (
		<SocialButton
			href='https://www.facebook.com/ismailjosim99'
			label='Facebook'
			icon={Facebook}
		/>
	),

	Twitter: () => (
		<SocialButton
			href='https://x.com/ismail_josim'
			label='X (Twitter)'
			icon={X}
		/>
	),
	Phone: () => (
		<SocialButton
			href='tel:+8801715052808'
			label='Phone'
			icon={Phone}
		/>
	),
	WhatsApp: () => (
		<SocialButton
			href="https://wa.me/8801715052808"
			label="WhatsApp"
			icon={MessageCircleMore}
		/>
	),
}

export default SocialIcons
