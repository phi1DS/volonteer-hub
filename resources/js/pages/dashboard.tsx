import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import ConfirmDialog from '@/components/ui/confirmDialog';
import Pagination from '@/components/ui/pagination';
import { UnderlinedClickable } from '@/components/ui/unerlinedClickable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_close, task_create, task_edit } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { useTranslate } from '@/hooks/use-translate';
import { Head, Link, router } from '@inertiajs/react';
import { Smile } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
    paginatedTasks: PaginatedModel<Task>;
}

export default function Dashboard({ paginatedTasks }: DashboardProps) {
    const { __ } = useTranslate();
    const tasks = paginatedTasks.data;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('Dashboard'),
            href: dashboard().url,
        },
    ];

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
                <Head title={__('Dashboard')} />

                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">{__('My created tasks')}</h1>
                        <Link href={task_create()}>
                            <Button variant="secondary">{__('Create New Task')}</Button>
                        </Link>
                    </div>

                    <div className="mx-auto text-gray-700 text-sm flex justify-center items-center gap-1">
                        <p>{__('The best filter is beeing organized')}</p>
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
                                                    {__('Update')}
                                                </Button>
                                            </Link>
                                            <UnderlinedClickable
                                                onClick={() =>
                                                    openConfirmDialog(task.id)
                                                }
                                                buttonText={__('Close Task')}
                                            />
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
                            <p className="text-gray-500">{__('No tasks available yet.')}</p>
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
                title={__('Close this task?')}
                message={__('Are you sure you want to close this task?')}
                confirmLabel={__('Close task')}
                cancelLabel={__('Cancel')}
                onConfirm={onConfirmModal}
                onCancel={onCancelModal}
            />
        </>
    );
}
