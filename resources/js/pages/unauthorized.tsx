import { useTranslate } from '@/hooks/use-translate';
import { Head } from '@inertiajs/react';

export default function About() {
    const { __ } = useTranslate();
    const title = __('Unauthorised action');

    return (
        <div className="p-6">
            <Head title={title} />
        </div>
    );
}
