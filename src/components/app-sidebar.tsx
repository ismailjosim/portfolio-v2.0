import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar"
import { BookOpen, Briefcase, Code2, Zap } from "lucide-react"
import Link from "next/link"

const navItems = [
    {
        label: "Blog",
        href: "/dashboard/blog",
        icon: BookOpen,
    },
    {
        label: "Projects",
        href: "/dashboard/projects",
        icon: Code2,
    },
    {
        label: "Skills",
        href: "/dashboard/skills",
        icon: Zap,
    },
    {
        label: "Work Experience",
        href: "/dashboard/experiences",
        icon: Briefcase,
    },

]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-lg font-bold">My Portfolio</span>
                </Link>
                <h2 className="text-lg font-bold">Dashboard</h2>
            </SidebarHeader>
            {/* add line under sidebar header */}
            <div className="border-b border-border" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.href} className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
