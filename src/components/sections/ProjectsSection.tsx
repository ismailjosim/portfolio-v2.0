'use client'
import { Github } from 'lucide-react'
import FadeUp from '../ui/FadeUp'
import { Button } from '../ui/button'
import { projectsSectionData } from '../../dummyData/dummyData'
import { TechTag } from '../../utils/TechTag'
import { TechBadge } from '../../utils/TechBadge'

const ProjectsSection = () => {
	return (
		<section id="projects" className="bg-card py-20">
			<div className="container mx-auto px-6">
				<FadeUp>
					<p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Things I&apos;ve built</p>
					<h2 className="text-4xl font-bold mb-12 text-foreground">Featured Projects</h2>
				</FadeUp>

				<div className="space-y-12">
					{projectsSectionData.map((project, i) => (
						<FadeUp key={project.name} delay={i * 100}>
							<div
								className="group grid overflow-hidden rounded-2xl border border-border transition-all lg:grid-cols-2"
								style={{ background: 'var(--card)' }}
							>
								{/* Visual Side */}
								<div
									className={`relative flex min-h-80 items-center justify-center overflow-hidden bg-linear-to-br ${project.gradient} ${project.reverse ? 'order-2' : ''
										}`}
								>
									<div className="relative z-10 flex h-64 flex-col items-center justify-center text-center">
										<div className="mb-4 text-6xl">{project.emoji}</div>
										<div
											className="text-4xl font-bold text-accent-foreground"
											style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
										>
											{project.name}
										</div>
										<div className="mt-2 text-xs leading-3 text-muted-foreground uppercase">
											{project.subtitle}
										</div>
									</div>

									{/* Hover Overlay */}
									<div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 bg-linear-to-t from-black via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-100">
										<p className="text-sm text-white">{project.bullets[0]}</p>
									</div>
								</div>

								{/* Content Side */}
								<div
									className={`p-8 flex flex-col justify-between ${project.reverse ? 'order-1' : ''
										}`}
								>
									<div>
										{/* Tags */}
										<div className="mb-4 flex flex-wrap gap-2">
											{project.tags.map((tag) => (
												<TechTag key={tag} tag={tag} />
											))}
										</div>

										{/* Title & Type */}
										<h3 className="mb-2 text-2xl font-bold text-foreground">{project.title}</h3>
										<p className="mb-6 text-sm text-muted-foreground">{project.type}</p>

										{/* Bullets */}
										<ul className="mb-6 space-y-3">
											{project.bullets.map((b) => (
												<li key={b} className="flex gap-3 text-sm text-muted-foreground">
													<span className="mt-0.5 shrink-0 font-bold text-accent">✓</span>
													<span>{b}</span>
												</li>
											))}
										</ul>

										{/* Badges */}
										<div className="mb-6 flex flex-wrap gap-2">
											{project.badges.map((b) => (
												<TechBadge key={b} badge={b} />
											))}
										</div>
									</div>

									{/* GitHub Button */}
									{project.githubUrl && (
										<Button
											asChild
											variant="default"
											className="inline-flex w-fit items-center gap-2"
										>
											<a href={project.githubUrl} target="_blank" rel="noreferrer">
												<Github className="w-4 h-4" />
												View on GitHub
											</a>
										</Button>
									)}
								</div>
							</div>
						</FadeUp>
					))}
				</div>

				{/* Footer Note */}
				<FadeUp delay={200}>
					<p className="mt-12 text-center text-sm text-muted-foreground">
						More projects coming soon — follow me on{' '}
						<a
							href="https://github.com/ismailjosim"
							target="_blank"
							rel="noreferrer"
							className="font-semibold hover:underline text-accent"
						>
							GitHub
						</a>
					</p>
				</FadeUp>
			</div>
		</section>
	)
}

export default ProjectsSection
