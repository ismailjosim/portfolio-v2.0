// app-sidebar.tsx
'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/src/components/ui/sidebar';

import { NavMain } from '@/src/components/nav-main';
import { NavUser } from '@/src/components/nav-user';
import { SidebarProfile } from './shared/sidebar-profile';
import { SidebarCollapsedLogo } from './shared/sidebar-collapsed-logo';
import { sidebarNav, sidebarUser } from './shared/sidebar.config';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader className="relative overflow-hidden">
        <SidebarProfile />
        <SidebarCollapsedLogo />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <NavMain items={sidebarNav} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
