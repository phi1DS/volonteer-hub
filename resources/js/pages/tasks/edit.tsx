import TaskForm from '@/components/tasks/taskForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_update } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { Task } from '@/types/models';
import { useTranslate } from '@/hooks/use-translate';
import { Head } from '@inertiajs/react';

interface EditTaskProps {
    task: Task;
}

export default function EditTask({ task }: EditTaskProps) {
    const { __ } = useTranslate();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: __('Dashboard'), href: dashboard().url },
        { title: __('Edit Task'), href: '/tasks/edit' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('Edit Task')} - ${task.subject}`} />

            <div className="flex justify-center p-6">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold">{__('Edit Task')}</h1>
                    </CardHeader>

                    <CardContent>
                        <TaskForm
                            action={task_update(task.id).url}
                            method="put"
                            task={task}
                            submitLabel={__('Update Task')}
                        ></TaskForm>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
