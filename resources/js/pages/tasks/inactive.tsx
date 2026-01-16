import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import ConfirmDialog from '@/components/ui/confirmDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/ui/pagination';
import { UnderlinedClickable } from '@/components/ui/unerlinedClickable';
import { useTranslate } from '@/hooks/use-translate';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_inactive, task_reopen } from '@/routes/tasks';
import { BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    paginatedInactiveTasks: PaginatedModel<Task>;
    filters: {
        subject: string;
    };
}

export default function InactiveTasks({
    paginatedInactiveTasks,
    filters,
}: Props) {
    const { __ } = useTranslate();
    const tasks = paginatedInactiveTasks.data;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: __('Dashboard'), href: dashboard().url },
    ];

    // -- Filters

    const [taskNameFilter, setTaskNameFilter] = useState(filters.subject ?? '');
    const handleFilter = () => {
        router.get(
            task_inactive(),
            {
                subject: taskNameFilter,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilter = () => {
        setTaskNameFilter('');
        router.get(task_inactive(), {}, { replace: true });
    };

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
            router.post(task_reopen(selectedTaskId));
        }
        setConfirmOpen(false);
        setSelectedTaskId(null);
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={__('Closed Tasks')} />

                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">
                            {__('My closed tasks')}
                        </h1>
                    </div>

                    <div className="mx-auto mb-5 flex items-end gap-2">
                        <div>
                            <Label htmlFor="taskNameFilter">
                                {__('Task name')}
                            </Label>
                            <Input
                                id="taskNameFilter"
                                value={taskNameFilter}
                                onChange={(e) =>
                                    setTaskNameFilter(e.target.value)
                                }
                                placeholder={__('e.g. Grass cutting')}
                                className="w-48"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>
                                {__('Filter')}
                            </Button>
                            <Button variant="secondary" onClick={resetFilter}>
                                {__('Reset')}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {tasks.length > 0 ? (
                            tasks.map(function (task) {
                                const cardFooter = (
                                    <>
                                        <CardFooter className="flex justify-end">
                                            <UnderlinedClickable
                                                onClick={() =>
                                                    openConfirmDialog(task.id)
                                                }
                                                buttonText={__('Reopen Task')}
                                            />
                                        </CardFooter>
                                    </>
                                );

                                return (
                                    <div key={task.id}>
                                        <TaskCard
                                            cardFooter={cardFooter}
                                            task={task}
                                            className="bg-black"
                                        ></TaskCard>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500">
                                {__('No tasks available yet.')}
                            </p>
                        )}
                    </div>
                </div>

                <Pagination
                    paginatedModel={paginatedInactiveTasks}
                    redirectUrl={task_inactive().url}
                    filters={{}}
                />
            </AppLayout>

            <ConfirmDialog
                open={confirmOpen}
                title={__('Reopen this task?')}
                message={__(
                    'Are you sure you want to reopen this task? It will move back to your active tasks list.',
                )}
                confirmLabel={__('Reopen')}
                cancelLabel={__('Cancel')}
                onConfirm={onConfirmModal}
                onCancel={onCancelModal}
            />
        </>
    );
}
