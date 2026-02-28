import Sidebar from '../components/Sidebar'
import SidebarOverlay from '../components/ui/SidebarOverlay'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsSection from '../components/sections/SkillsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import WorkingAreasSection from '../components/sections/WorkingAreasSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import EducationSection from '../components/sections/EducationSection'
import BlogSection from '../components/sections/BlogSection'
import GitHubSection from '../components/sections/GitHubSection'
import ContactSection from '../components/sections/ContactSection'
import MobileMenuButton from '../components/ui/MobileMenuButton'
import ScrollToTop from '../components/ui/ScrollToTop'

export default function HomePage() {
	return (
		<>
			<header className='lg:block hidden'>
				<SidebarOverlay />
				<MobileMenuButton />
				<Sidebar />
			</header>
			<main
				id='main'
				className='min-h-screen transition-all duration-300 lg:ml-70'
			>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ExperienceSection />
				<WorkingAreasSection />
				<ProjectsSection />
				<EducationSection />
				<BlogSection />
				<GitHubSection />
				<ContactSection />
			</main>
			{/* <footer className='absolute'> */}
			<ScrollToTop />
			{/* </footer> */}
		</>
	)
}
