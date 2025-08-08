'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpen, Bookmark, Home, LayoutGrid, Rss, Settings } from 'lucide-react';
import { contentData } from '@/lib/content-data';

const AppSidebar = () => {
  const pathname = usePathname();
  const categories = [...new Set(contentData.map(item => item.category))];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-semibold">InfoFlow</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Home">
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/bookmarks'} tooltip="Bookmarks">
              <Link href="/bookmarks">
                <Bookmark />
                <span>Bookmarks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 px-2 text-sm font-semibold text-muted-foreground">Categories</div>
        <SidebarMenu>
          {categories.map(category => (
            <SidebarMenuItem key={category}>
              <SidebarMenuButton asChild>
                <Link href={`/?q=${encodeURIComponent(category)}`}>
                  <LayoutGrid />
                  <span>{category}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
                <Settings/>
                <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default AppSidebar;
