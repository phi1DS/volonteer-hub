import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import ConfirmDialog from '@/components/ui/confirmDialog';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_close, task_create, task_edit } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Smile } from 'lucide-react';
import { useState } from 'react';

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

    // -- Confirm Modal
    
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const openConfirmDialog = (taskId: number) => {
        setSelectedTaskId(taskId);
        setConfirmOpen(true);
    };

    const onCancelModal = () => {
        setConfirmOpen(false);
        setSelectedTaskId(null);
    };

    const onConfirmModal = async () => {
        if (selectedTaskId) {
            router.post(task_close(selectedTaskId));
        }
        setConfirmOpen(false);
        setSelectedTaskId(null);
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">My created tasks</h1>
                        <Link href={task_create()}>
                            <Button variant="secondary">Create New Task</Button>
                        </Link>
                    </div>

                    <div className="mx-auto text-gray-700 text-sm flex justify-center items-center gap-1">
                        <p>The best filter is beeing organized</p>
                        <Smile size={14}/>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
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
                                                className="cursor-pointer text-sm font-normal text-muted-foreground underline underline-offset-4 hover:text-gray-800"
                                                onClick={() =>
                                                    openConfirmDialog(task.id)
                                                }
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

            <ConfirmDialog
                open={confirmOpen}
                title="Close this task?"
                message="Are you sure you want to close this task?"
                confirmLabel="Close task"
                cancelLabel="Cancel"
                onConfirm={onConfirmModal}
                onCancel={onCancelModal}
            />
        </>
    );
}
