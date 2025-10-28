import FlashMessage from '@/components/flashMessage';
import TaskCard from '@/components/tasks/taskCard';
import TaskOutdatedNotice from '@/components/tasks/taskOutdated';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_create, task_edit, task_resolve } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';

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
    const { props } = usePage<{ flash: { message?: string; type?: string } }>();
    const flash = props.flash;

    const tasks = paginatedTasks.data;
    console.log(tasks);

    const handleResolveTask = (taskId: number) => {
        router.post(task_resolve(taskId));
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

                <FlashMessage
                    message={flash.message}
                    type={flash.type as 'success' | 'error' | 'info'}
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.length > 0 ? (
                        tasks.map(function (task) {
                            const now = new Date();
                            const dateStart = new Date(task.date_start);

                            const cardFooter = (
                                <>
                                    {dateStart < now && <TaskOutdatedNotice />}
                                    <CardFooter className="flex justify-between">
                                        <Link href={task_edit(task.id)}>
                                            <Button variant="secondary">
                                                Update
                                            </Button>
                                        </Link>
                                        <Link className="text-sm leading-normal font-normal text-muted-foreground underline underline-offset-4">
                                            <p
                                                onClick={() =>
                                                    handleResolveTask(task.id)
                                                }
                                            >
                                                Mark as Resolved
                                            </p>
                                        </Link>
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
