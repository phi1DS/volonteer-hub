import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslate } from '@/hooks/use-translate';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { __ } = useTranslate();
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{__('Platform')}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url === item.href.url}
                            tooltip={{ children: item.title }}
                        >
                            <Link
                                href={item.href}
                                {...(item.preserveState === false
                                    ? { preserveState: false }
                                    : {})}
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                {item.count !== undefined && (
                                    <span className="ml-auto pr-1 text-xs font-medium text-muted-foreground">
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
