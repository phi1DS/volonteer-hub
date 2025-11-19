import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_create, task_edit, task_close } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import httpClient from '@/lib/axios';
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    paginatedTasks: PaginatedModel<Task>;
}

export default function Dashboard({ paginatedTasks }: DashboardProps) {

    const tasks = paginatedTasks.data;

    const handleResolveTask = async (taskId: number) => {
        try {
            await httpClient.post(task_close(taskId).url);

            toast.success("Task marked as resolved");
            router.reload({ only: ['paginatedTasks'] });
        } catch (error) {
            toast.error("Error when sending request");
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My created tasks</h1>
                    <Link href={task_create()}>
                        <Button variant="secondary">Create New Task</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.length > 0 ? (
                        tasks.map(function (task) {
                            const cardFooter = (
                                <>
                                    <CardFooter className="flex justify-between">
                                        <Link href={task_edit(task.id)}>
                                            <Button variant="secondary">
                                                Update
                                            </Button>
                                        </Link>
                                        <button
                                            className="text-sm font-normal text-muted-foreground underline underline-offset-4 cursor-pointer"
                                            onClick={() => handleResolveTask(task.id)}
                                        >
                                            Close Task
                                        </button>
                                    </CardFooter>
                                </>
                            );

                            return (
                                <div key={task.id}>
                                    <TaskCard
                                        cardFooter={cardFooter}
                                        task={task}
                                    ></TaskCard>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">No tasks available yet.</p>
                    )}
                </div>

                <Pagination
                    paginatedModel={paginatedTasks}
                    redirectUrl={dashboard().url}
                    filters={{}}
                />
            </div>
        </AppLayout>
    );
}
