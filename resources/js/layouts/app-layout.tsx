import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from "sonner";

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { flash } = usePage<{ flash: { message?: string; type?: string } }>().props;

    useEffect(() => {
        if (flash.type === 'success') {
            toast.success(flash.message);
        }
        if (flash.type === 'error') {
            toast.error(flash.message);
        }
    }, [flash]);
    
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster />

            {children}
        </AppLayoutTemplate>
    );
}
