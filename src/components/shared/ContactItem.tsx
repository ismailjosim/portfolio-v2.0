import { IContactInfoItem } from '../sections/ContactSection'
import { Button } from '../ui/button'

const ContactItem = ({ icon: Icon, label, value, href }: IContactInfoItem) => {
	return (
		<div className='flex gap-4 items-start'>
			<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted'>
				<Icon className='h-5 w-5 text-accent' />
			</div>

			<div className='space-y-1'>
				<p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
					{label}
				</p>

				{href ? (
					<Button
						asChild
						variant='link'
						className='h-auto p-0 text-base font-medium text-foreground hover:text-accent'
					>
						<a
							href={href}
							target={href?.startsWith('http') ? '_blank' : undefined}
							rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
						>
							{value}
						</a>
					</Button>
				) : (
					<p className='font-medium text-foreground'>{value}</p>
				)}
			</div>
		</div>
	)
}
export default ContactItem
