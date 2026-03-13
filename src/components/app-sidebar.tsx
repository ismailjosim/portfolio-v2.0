'use client'

import * as React from 'react'
import {
  AudioWaveform,
  Award,
  BookOpen,
  Bot,
  Briefcase,
  Command,
  FolderKanban,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Layers,
  Map,
  MessageCircle,
  PieChart,
  Radio,
  Settings2,
  SquareTerminal,
  Star,
  User,
} from 'lucide-react'

import { NavMain } from '@/src/components/nav-main'
import { NavProjects } from '@/src/components/nav-projects'
import { NavUser } from '@/src/components/nav-user'
import { TeamSwitcher } from '@/src/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/src/components/ui/sidebar'
import Image from 'next/image'
import SocialIcons from './modules/SocialIcons'

// This is sample data.
const user = {
  name: 'JASIM',
  email: 'dashboard@ismailjosim.com',
  avatar: '/person.jpeg',
}

// const navItems = [
//   { id: 'hero', label: 'Home', icon: Home },
//   { id: 'about', label: 'About Me', icon: User },
//   { id: 'skills', label: 'Skills', icon: Star },
//   { id: 'experience', label: 'Experience', icon: Briefcase },
//   { id: 'workings', label: 'Workings', icon: Radio },
//   { id: 'projects', label: 'Projects', icon: Layers },
//   { id: 'education', label: 'Education', icon: GraduationCap },
//   { id: 'blog', label: 'Blog', icon: BookOpen },
//   { id: 'contact', label: 'Contact', icon: MessageCircle },
//   { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard' },
// ]

const navMain = [
  {
    title: 'Blogs',
    url: '/blog',
    icon: BookOpen,
    isActive: true,
    // items: [
    //   {
    //     title: "Add Book",
    //     url: "/dashboard/blog/add",
    //   },

    // ],
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderKanban
  },
  {
    title: 'Skills',
    url: '/skills',
    icon: Award
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='relative overflow-hidden'>
        {/* Expanded Profile */}
        <div
          className='
      p-6 text-center border-b border-border shrink-0
      transition-all duration-300 ease-in-out
      group-data-[collapsible=icon]:opacity-0
      group-data-[collapsible=icon]:scale-90
      group-data-[collapsible=icon]:h-0
      group-data-[collapsible=icon]:p-5
    '
        >
          <div className='relative inline-block mb-3'>
            <div className='w-24 h-24 rounded-full ring-2 ring-primary mx-auto overflow-hidden'>
              <Image
                className='w-full h-full object-cover'
                alt='JASIM'
                src='/person.jpeg'
                width={500}
                height={500}
              />
            </div>
          </div>

          <h3 className='font-bold text-foreground text-base'>Md. Jasim</h3>

          <p className='text-xs text-accent font-medium mt-1'>
            Full Stack Developer
          </p>

          <div className='flex justify-center gap-2 mt-3'>
            <SocialIcons.Phone />
            <SocialIcons.Email />
            <SocialIcons.WhatsApp />
          </div>
        </div>

        {/* Collapsed Logo */}
        <div
          className='
      absolute inset-0 flex items-center justify-center
      opacity-0 scale-75
      transition-all duration-300 ease-in-out
      group-data-[collapsible=icon]:opacity-100
      group-data-[collapsible=icon]:scale-100
    '
        >
          <Image src='/person.jpeg' alt='logo' width={32} height={32} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
