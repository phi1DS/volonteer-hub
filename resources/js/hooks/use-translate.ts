import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';

export function useTranslate() {
    const { translations } = usePage<SharedData>().props;

    const __ = useCallback(
        (key: string) => translations[key] ?? key,
        [translations],
    );

    return { __ };
}
