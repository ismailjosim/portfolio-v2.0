'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
	Phone,
	Mail,
	MapPin,
	Github,
	Linkedin,
	Twitter,
	Send,
} from 'lucide-react'
import FadeUp from '../ui/FadeUp'

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			toast.error('Please fill in all required fields.')
			return
		}
		console.log('Form Data:', formData)
		toast.success(
			"Thank you for reaching out! 🎉 I'll get back to you as soon as possible.",
		)
		setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
	}

	const contactInfo = [
		{
			icon: Phone,
			label: 'Phone',
			value: '+880-1715-052-808',
			href: 'tel:+8801715052808',
		},
		{
			icon: Mail,
			label: 'Email',
			value: 'ismailjosim@yahoo.com',
			href: 'mailto:ismailjosim@yahoo.com',
		},
		{
			icon: MapPin,
			label: 'Location',
			value: 'Bangladesh · Remote Available',
			href: undefined,
		},
	]

	const socialLinks = [
		{ href: 'https://github.com/ismailjosim', icon: Github },
		{ href: 'https://linkedin.com/in/ismailjosim', icon: Linkedin },
		{ href: 'https://twitter.com/ismailjosim', icon: Twitter },
		{ href: 'mailto:ismailjosim@yahoo.com', icon: Mail },
	]

	const inputClass =
		'w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder:text-muted-foreground'

	return (
		<section id='contact' className='bg-background sm:pb-20 flex items-center'>
			<div className='container mx-auto max-w-7xl'>
				<FadeUp>
					<div className='text-center sm:mb-16 mb-8'>
						<p className='section-label'>Get in Touch</p>
						<h2 className='text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6'>
							Contact Me
						</h2>
						<div className='w-16 h-1 bg-accent mx-auto rounded-full' />
					</div>
				</FadeUp>

				<div className='lg:grid flex flex-col md:grid-cols-3 gap-12'>
					{/* Left: Info */}
					<FadeUp delay={100}>
						<p className='text-muted-foreground mb-8 leading-relaxed text-justify text-base'>
							I&apos;m available for freelance projects, full-time roles, and
							mentoring. Whether you have a specific project in mind or just
							want to say hi — reach out.
						</p>

						<div className='space-y-6 mb-8'>
							{contactInfo.map(({ icon: Icon, label, value, href }) => (
								<div key={label} className='flex gap-4 items-start'>
									<div className='w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mt-1 bg-skill-bg border border-border '>
										<Icon className='w-5 h-5 text-accent ' />
									</div>
									<div>
										<div className='text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1'>
											{label}
										</div>
										{href ? (
											<a
												href={href}
												className='text-foreground font-medium transition-colors'
											>
												{value}
											</a>
										) : (
											<div className='text-foreground font-medium'>{value}</div>
										)}
									</div>
								</div>
							))}
						</div>

						<div>
							<div className='text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4'>
								Connect With Me
							</div>
							<div className='flex gap-3'>
								{socialLinks.map(({ href, icon: Icon }) => (
									<a
										key={href}
										href={href}
										target={href.startsWith('http') ? '_blank' : undefined}
										rel='noreferrer'
										className='social-btn border border-border text-accent hover:text-white'
									>
										<Icon className='w-4 h-4 ' />
									</a>
								))}
							</div>
						</div>
					</FadeUp>

					{/* Right: Form */}
					<FadeUp delay={200} className='md:col-span-2'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='grid md:grid-cols-2 gap-4'>
								<input
									type='text'
									id='name'
									placeholder='Your Name'
									required
									value={formData.name}
									onChange={handleChange}
									className={inputClass}
								/>
								<input
									type='tel'
									id='phone'
									placeholder='Phone Number'
									value={formData.phone}
									onChange={handleChange}
									className={inputClass}
								/>
							</div>
							<input
								type='email'
								id='email'
								placeholder='Email Address'
								required
								value={formData.email}
								onChange={handleChange}
								className={inputClass}
							/>
							<input
								type='text'
								id='subject'
								placeholder='Subject'
								required
								value={formData.subject}
								onChange={handleChange}
								className={inputClass}
							/>
							<textarea
								id='message'
								placeholder='Your Message'
								rows={6}
								required
								value={formData.message}
								onChange={handleChange}
								className={`${inputClass} resize-none`}
							/>
							<button
								type='submit'
								className='btn-primary w-full justify-center group'
							>
								<Send className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								Send Message
							</button>
						</form>
					</FadeUp>
				</div>
			</div>
		</section>
	)
}
