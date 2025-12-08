import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_inactive, task_reopen } from '@/routes/tasks';
import { BreadcrumbItem } from '@/types';
import { PaginatedModel, Task } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import ConfirmDialog from '@/components/ui/confirmDialog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

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
    const tasks = paginatedInactiveTasks.data;

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
                <Head title="Closed Tasks" />

                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">My closed tasks</h1>
                    </div>

                    <div className="mx-auto flex items-end gap-2 mb-5">
                        <div>
                            <Label htmlFor="taskNameFilter">Task name</Label>
                            <Input
                                id="taskNameFilter"
                                value={taskNameFilter}
                                onChange={(e) => setTaskNameFilter(e.target.value)}
                                placeholder="e.g. Grass cutting"
                                className="w-48"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button variant="secondary" onClick={resetFilter}>
                                Reset
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {tasks.length > 0 ? (
                            tasks.map(function (task) {
                                const cardFooter = (
                                    <>
                                        <CardFooter className="flex justify-end">
                                            <button className="cursor-pointer text-sm leading-normal font-normal text-muted-foreground underline underline-offset-4">
                                                <p
                                                    onClick={() => openConfirmDialog(task.id)}
                                                >
                                                    Reopen Task
                                                </p>
                                            </button>
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
                            <p className="text-gray-500">No tasks available yet.</p>
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
                title="Reopen this task?"
                message="Are you sure you want to reopen this task? It will move back to your active tasks list."
                confirmLabel="Reopen"
                cancelLabel="Cancel"
                onConfirm={onConfirmModal}
                onCancel={onCancelModal}
            />
        </>
    );
}
