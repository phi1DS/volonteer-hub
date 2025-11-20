import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from "sonner";

interface BackendLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: BackendLayoutProps) => {
    const { flash } = usePage<{ flash: { message?: string; type?: string } }>().props;

    useEffect(() => {
        if (flash.type === 'success') {
            toast.success(flash.message, {
                style: {
                    background: '#096e09ff',
                },
            });
        }
        if (flash.type === 'error') {
            toast.error(flash.message, {
                style: {
                    background: '#d60b04',
                },
            });
        }
    }, [flash]);
    
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster />

            {children}
        </AppLayoutTemplate>
    );
}
