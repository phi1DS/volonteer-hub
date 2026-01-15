import { Head } from '@inertiajs/react';
import { useTranslate } from '@/hooks/use-translate';

export default function About() {
    const { __ } = useTranslate();
    const title = __('Unauthorised action');

    return (
        <div className="p-6">
            <Head title={title} />
        </div>
    );
}
