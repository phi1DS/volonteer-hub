import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { volonteer_answer_list } from '@/routes/volonteer_answer_backend';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type VolonteerAnswer } from '@/types/models';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Volonteer answers',
        href: volonteer_answer_list().url,
    },
    {
        title: 'Answer details',
        href: '#',
    },
];

interface PageProps {
    volonteerAnswer: VolonteerAnswer;
}

export default function VolonteerAnswerShow({ volonteerAnswer }: PageProps) {
    const submittedAt = new Date(volonteerAnswer.created_at).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Answer from ${volonteerAnswer.name}`} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Volunteer answer</h1>
                        <p className="text-sm text-muted-foreground">
                            Received on {submittedAt}
                        </p>
                    </div>

                    <Link href={volonteer_answer_list().url}>
                        <Button variant="outline">Back to answers</Button>
                    </Link>
                </div>

                <div className="">
                    <Card className="h-full">
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">Name</p>
                                <p className="text-base text-foreground">{volonteerAnswer.name}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">Message</p>
                                <p className="whitespace-pre-line text-base text-foreground">
                                    {volonteerAnswer.message || 'No message provided.'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

