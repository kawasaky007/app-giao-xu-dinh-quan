'use client';

import withAuth from "@/components/auth/withAuth";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home, Newspaper, Calendar, HelpCircle, Image as ImageIcon, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { href: '/admin', label: 'Tổng quan', icon: Home },
        { href: '/admin/news', label: 'Tin Tức', icon: Newspaper },
        { href: '/admin/events', label: 'Sự Kiện', icon: Calendar },
        { href: '/admin/faq', label: 'Hỏi Đáp', icon: HelpCircle },
        { href: '/admin/media', label: 'Thư Viện', icon: ImageIcon },
        { href: '/admin/users', label: 'Người Dùng', icon: Users },
    ]

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground rounded-lg p-2">
                            <Home className="w-5 h-5" />
                        </div>
                        <h1 className="font-semibold text-lg">Admin</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {menuItems.map(item => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <SidebarTrigger className="sm:hidden" />
                    {/* Add Breadcrumbs or other header content here if needed */}
                </header>
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

// Protect the whole admin section
export default withAuth(AdminLayout, ['admin', 'editor']);
