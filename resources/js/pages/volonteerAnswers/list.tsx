import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { volonteer_answer_list, volonteer_answer_show } from '@/routes/volonteer_answer_backend';
import { Button } from '@/components/ui/button';
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
];

interface PageProps {
    paginatedVolonteerAnswers: PaginatedModel<VolonteerAnswer>;
}

const truncate = (text: string, maxLength = 40) => {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength)}…`;
};

export default function VolonteerAnswerList({ paginatedVolonteerAnswers }: PageProps) {
    const answers = paginatedVolonteerAnswers.data;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Volonteer answers" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Volonteer answers</h1>
                    <p className="text-muted-foreground">
                        Here are the answers sent by volunteers for your tasks.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] border-collapse rounded-lg border text-left text-sm shadow-sm">
                        <thead className="bg-muted/60 text-xs text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Task</th>
                                <th className="px-4 py-3 font-medium">Volunteer</th>
                                <th className="px-4 py-3 font-medium">Volunteer message</th>
                                <th className="px-4 py-3 font-medium">Received on</th>
                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.length > 0 ? (
                                answers.map((answer) => {
                                    const submittedAt = new Date(answer.created_at).toLocaleString('fr-FR', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    });

                                    return (
                                        <tr key={answer.id} className="border-t transition">
                                            <td className="px-4 py-3 align-top">
                                                <p className="font-medium text-foreground">{answer.task.subject}</p>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p className="font-medium text-foreground">{answer.name}</p>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p>{truncate(answer.message)}</p>
                                            </td>
                                            <td className="px-4 py-3 align-top text-muted-foreground">{submittedAt}</td>
                                            <td className="px-4 py-3 align-top text-right">
                                                <Link
                                                    href={`${volonteer_answer_show(answer.id).url}`}
                                                    className="text-sm font-medium text-primary"
                                                >
                                                    <Button variant="secondary">View details</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="px-4 py-6 text-center text-muted-foreground" colSpan={5}>
                                        No volonteer answers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination paginatedModel={paginatedVolonteerAnswers} redirectUrl={volonteer_answer_list().url} filters={{}} />
            </div>
        </AppLayout>
    );
}

