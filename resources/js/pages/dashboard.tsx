import FlashMessage from '@/components/flashMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { about, dashboard } from '@/routes';
import { task_create, task_edit, task_resolve } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { Task } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';

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
    
    const { props } = usePage<{ flash: { message?: string, type?: string } }>();
    const flash = props.flash;

    const truncate = (text: string, maxLength = 400) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "…" : text
    }

    const handleResolveTask = (taskId: number) => {
        router.post(task_resolve(taskId));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My created tasks</h1>
                    <Link href={task_create()}>
                        <Button>Create New Task</Button>
                    </Link>
                </div>

                <FlashMessage message={flash.message} type={flash.type as any} />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                    <Card key={task.id} className="rounded-xl shadow-sm flex justify-between">
                        <div>
                            <CardHeader>
                                <CardTitle>{task.subject}</CardTitle>
                                <p className="text-sm text-gray-500 mt-3">
                                    Organisation : {task.organisation || "No organisation"}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Created By : {task.user?.name ?? "No user assigned"}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-2 mt-4">{truncate(task.message)}</p>
                                <p className="text-sm text-gray-500 mt-4">{task.contact_information}</p>
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
                        </div>
                        
                        <CardFooter className='flex justify-between'>
                            <Link href={task_edit(task.id)}>
                                <Button variant="secondary">Update</Button>
                            </Link>
                            <Link className="text-muted-foreground text-sm leading-normal font-normal underline underline-offset-4">
                                <p onClick={() => handleResolveTask(task.id)}>Mark as Resolved</p>
                            </Link>
                        </CardFooter>
                    </Card>
                    ))
                ) : (
                    <p className="text-gray-500">No tasks available yet.</p>
                )}
                </div>

                <Link href={about()} className="text-blue-600 hover:underline">
                    About Page
                </Link>
            </div>
        </AppLayout>
    );
}
