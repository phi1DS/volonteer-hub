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
import { useTranslate } from '@/hooks/use-translate';
import { dashboard, homepage } from '@/routes';
import { task_inactive } from '@/routes/tasks';
import { volunteer_answer_list } from '@/routes/volunteer_answer_backend';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Archive, Book, MessageCircle } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { __ } = useTranslate();
    const { sidebarCounts } = usePage<SharedData>().props;
    if (!sidebarCounts) {
        return null;
    }

    const mainNavItems: NavItem[] = [
        {
            title: __('Opened Tasks'),
            href: dashboard(),
            icon: Book,
            preserveState: false,
            count: sidebarCounts.openedTasks,
        },
        {
            title: __('Closed Tasks'),
            href: task_inactive(),
            icon: Archive,
            preserveState: false,
            count: sidebarCounts.closedTasks,
        },
        {
            title: __('Volunteer Answers'),
            href: volunteer_answer_list(),
            icon: MessageCircle,
            count: sidebarCounts.volunteerAnswers,
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
