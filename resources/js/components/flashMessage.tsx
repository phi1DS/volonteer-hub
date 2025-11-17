import { Alert, AlertDescription } from '@/components/ui/alert';

interface FlashMessageProps {
    message?: string;
    type?: 'success' | 'error' | 'info';
}

export default function FlashMessage({
    message,
    type = 'success',
}: FlashMessageProps) {
    if (!message) return null;

    const colorClasses =
        type === 'error'
            ? 'text-red-800'
            : type === 'info'
              ? 'text-blue-800'
              : 'text-green-800';

    return (
        <Alert className={`flex items-start justify-between mb-4`}>
            <div>
                <AlertDescription className={colorClasses}>
                    {message}
                </AlertDescription>
            </div>
        </Alert>
    );
}
