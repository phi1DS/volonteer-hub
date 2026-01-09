import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { volunteer_answer_list, volunteer_answer_update } from '@/routes/volunteer_answer_backend';
import { type BreadcrumbItem } from '@/types';
import { type VolunteerAnswer } from '@/types/models';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

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
    const { data, setData, patch, processing, errors } = useForm({
        notes: volunteerAnswer.notes || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const route = volunteer_answer_update({ volunteerAnswer: volunteerAnswer.id });
        patch(route.url, {
            onSuccess: () => {
                // optional: show success toast if not already handled by layout
            }
        });
    };

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <Textarea
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData('notes', e.target.value)
                                    }
                                    placeholder="Add your private notes about this volunteer..."
                                    className="min-h-[150px]"
                                />
                                {errors.notes && (
                                    <p className="text-sm text-destructive">
                                        {errors.notes}
                                    </p>
                                )}
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Save Notes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
