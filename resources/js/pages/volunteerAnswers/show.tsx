import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { volunteer_answer_list } from '@/routes/volunteer_answer_backend';
import { type BreadcrumbItem } from '@/types';
import { type VolunteerAnswer } from '@/types/models';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Volunteer answers',
        href: volunteer_answer_list().url,
    },
    {
        title: 'Answer details',
        href: '#',
    },
];

interface PageProps {
    volunteerAnswer: VolunteerAnswer;
}

export default function VolunteerAnswerShow({ volunteerAnswer }: PageProps) {
    const submittedAt = new Date(volunteerAnswer.created_at).toLocaleString(
        'fr-FR',
        {
            dateStyle: 'full',
            timeStyle: 'short',
        },
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Answer from ${volunteerAnswer.name}`} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Volunteer answer
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Received on {submittedAt}
                        </p>
                    </div>

                    <Link href={volunteer_answer_list().url}>
                        <Button variant="outline">Back to answers</Button>
                    </Link>
                </div>

                <div className="">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Volunteer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">
                                    Name
                                </p>
                                <p className="text-base text-foreground">
                                    {volunteerAnswer.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase">
                                    Message
                                </p>
                                <p className="text-base whitespace-pre-line text-foreground">
                                    {volunteerAnswer.message ||
                                        'No message provided.'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
