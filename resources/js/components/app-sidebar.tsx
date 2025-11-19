import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, homepage } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Archive, Book, House, MessageCircle } from 'lucide-react';
import AppLogo from './app-logo';
import { task_inactive } from '@/routes/tasks';
import { volunteer_answer_list } from '@/routes/volunteer_answer_backend';

const mainNavItems: NavItem[] = [
    {
        title: 'Opened Tasks',
        href: dashboard(),
        icon: Book,
    },
    {
        title: 'Closed Tasks',
        href: task_inactive(),
        icon: Archive,
    },
    {
        title: 'Volunteer Answers',
        href: volunteer_answer_list(),
        icon: MessageCircle,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homepage()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
