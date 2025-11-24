import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    volunteer_answer_delete,
    volunteer_answer_list,
    volunteer_answer_show,
} from '@/routes/volunteer_answer_backend';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, VolunteerAnswer } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Volunteer answers',
        href: volunteer_answer_list().url,
    },
];

interface PageProps {
    paginatedVolunteerAnswers: PaginatedModel<VolunteerAnswer>;
    filters?: {
        task?: string;
    };
}

const truncate = (text: string, maxLength = 40) => {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength)}…`;
};

export default function VolunteerAnswerList({
    paginatedVolunteerAnswers,
    filters = {},
}: PageProps) {
    const answers = paginatedVolunteerAnswers.data;
    const [taskFilter, setTaskFilter] = useState(filters.task ?? '');

    const handleFilter = () => {
        router.get(
            volunteer_answer_list(),
            {
                task: taskFilter,
            },
            {
                replace: true,
                preserveState: true,
            },
        );
    };

    const handleReset = () => {
        setTaskFilter('');
        router.get(
            volunteer_answer_list(),
            {},
            {
                replace: true,
            },
        );
    };

    const handleDelete = (answer: VolunteerAnswer) => {
        router.delete(volunteer_answer_delete(answer));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Volunteer answers" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">
                        Volunteer answers
                    </h1>

                    <div className="mt-2 flex justify-end gap-3">
                        <div className="flex flex-col gap-1">
                            <Input
                                id="taskFilter"
                                placeholder="Filter by task subject"
                                value={taskFilter}
                                onChange={(event) =>
                                    setTaskFilter(event.target.value)
                                }
                                className="w-64"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={handleFilter}>
                                Filter
                            </Button>
                            <Button variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] border-collapse rounded-lg border text-left text-sm shadow-sm">
                        <thead className="bg-muted/60 text-xs text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Task</th>
                                <th className="px-4 py-3 font-medium">
                                    Volunteer
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Volunteer message
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Received on
                                </th>
                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.length > 0 ? (
                                answers.map((answer) => {
                                    const submittedAt = new Date(
                                        answer.created_at,
                                    ).toLocaleString('fr-FR', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    });

                                    return (
                                        <tr
                                            key={answer.id}
                                            className="border-t transition"
                                        >
                                            <td className="px-4 py-3 align-top">
                                                <p className="font-medium text-foreground">
                                                    {answer.task.subject}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p className="font-medium text-foreground">
                                                    {answer.name}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <p>
                                                    {truncate(answer.message)}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 align-top text-muted-foreground">
                                                {submittedAt}
                                            </td>
                                            <td className="px-4 py-3 text-right flex gap-2">
                                                <Link
                                                    href={
                                                        volunteer_answer_show(
                                                            answer.id,
                                                        ).url
                                                    }
                                                    className="text-sm font-medium text-primary"
                                                >
                                                    <Button variant="secondary">
                                                        View details
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        handleDelete(answer)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        className="px-4 py-6 text-center text-muted-foreground"
                                        colSpan={5}
                                    >
                                        No volunteer answers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    paginatedModel={paginatedVolunteerAnswers}
                    redirectUrl={volunteer_answer_list().url}
                    filters={{ task: taskFilter }}
                />
            </div>
        </AppLayout>
    );
}
