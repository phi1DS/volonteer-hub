import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children }: AppLayoutProps) => {
    const { flash } = usePage<{ flash: { message?: string; type?: string } }>()
        .props;

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
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            scriptProps={{ async: true, defer: true }}
        >
            <Toaster />

            {children}
        </GoogleReCaptchaProvider>
    );
};
