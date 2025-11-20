import TaskCard from "@/components/tasks/taskCard";
import { CardFooter } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { task_reopen } from "@/routes/tasks";
import { BreadcrumbItem } from "@/types";
import { PaginatedModel, Task } from "@/types/models";
import { Head, Link, router } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

interface Props {
    paginatedInactiveTasks: PaginatedModel<Task>;
}

export default function InactiveTasks({ paginatedInactiveTasks }: Props) {

    const tasks = paginatedInactiveTasks.data;

    const handleRepoenTask = async (taskId: number) => {
        router.post(task_reopen(taskId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Closed Tasks" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">My closed tasks</h1>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.length > 0 ? (
                        tasks.map(function (task) {
                            const cardFooter = (
                                <>
                                    <CardFooter className="flex justify-end">
                                        <button className="text-sm leading-normal font-normal text-muted-foreground underline underline-offset-4 cursor-pointer">
                                            <p
                                                onClick={() =>
                                                    handleRepoenTask(task.id)
                                                }
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
        </AppLayout>
    )
}