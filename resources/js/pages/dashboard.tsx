import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Task } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
  tasks: Task[]
}

export default function Dashboard({ tasks }: DashboardProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Tasks</h1>
                <Link href="/dashboard/tasks/create">
                    <Button>Create New Task</Button>
                </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                    <Card key={task.id} className="rounded-xl shadow-sm">
                        <CardHeader>
                        <CardTitle>{task.subject}</CardTitle>
                        <p className="text-sm text-gray-500">
                            {task.organisation || "No organisation"}
                        </p>
                        </CardHeader>
                        <CardContent>
                        <p className="text-gray-700 mb-2">{task.message}</p>
                        <p className="text-sm text-gray-500">
                            From:{" "}
                            {new Date(task.date_start).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                            })}
                        </p>
                        <p className="text-sm text-gray-500">
                            To:{" "}
                            {new Date(task.date_end).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                            })}
                        </p>
                        </CardContent>
                    </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No tasks available yet.</p>
                )}
                </div>

                <Link href="/about" className="text-blue-600 hover:underline">
                About Page
                </Link>
            </div>
        </AppLayout>
    );
}
