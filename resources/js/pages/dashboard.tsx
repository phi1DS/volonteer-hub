import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Task } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import React from 'react';

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

    // TODO use route alias

    const { props } = usePage<{ flash: { message?: string, type?: string } }>();
    const flash = props.flash;

    const [visible, setVisible] = React.useState(true);

    const truncate = (text: string, maxLength = 400) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "…" : text
    }

    const handleResolveTask = (taskId: number) => {
        setVisible(true)
        router.post(`/dashboard/tasks/${taskId}/resolve`)
    }

    // <Alert variant="default | destructive">

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">My created tasks</h1>
                <Link href="/dashboard/tasks/create">
                    <Button>Create New Task</Button>
                </Link>
                </div>

                {flash.message && visible && (
                    <Alert className="flex justify-between items-start items-center">
                        <AlertDescription className="text-green-800 ">
                            {flash.message}
                        </AlertDescription>
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => setVisible(false)}
                            className="p-1"
                            >
                            <X className="h-4 w-4" />
                        </Button>
                    </Alert>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                    <Card key={task.id} className="rounded-xl shadow-sm">
                        <CardHeader>
                        <CardTitle>{task.subject}</CardTitle>
                        <p className="text-sm text-gray-500">
                            {task.organisation || "No organisation"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Created By : {task.user?.name ?? "No user assigned"}
                        </p>
                        </CardHeader>
                        <CardContent>
                        <p className="text-gray-700 mb-2">{truncate(task.message)}</p>
                        <p className="text-sm text-gray-500">{task.contact_information}</p>
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
                        <CardFooter>
                            <Link href="/dashboard/tasks/update">
                                <Button>Create New Task</Button>
                            </Link>
                            <Button variant="secondary" onClick={() => handleResolveTask(task.id)}>
                                Mark as Resolved
                            </Button>
                        </CardFooter>
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
