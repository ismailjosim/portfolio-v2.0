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
        label: "Skills",
        href: "/dashboard/skills",
        icon: Zap,
    },
    {
        label: "Blog",
        href: "/dashboard/blog",
        icon: BookOpen,
    },
    {
        label: "Work Experience",
        href: "/dashboard/experiences",
        icon: Briefcase,
    },
    {
        label: "Projects",
        href: "/dashboard/projects",
        icon: Code2,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-lg font-bold">Dashboard</h2>
            </SidebarHeader>
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
