import TaskForm from '@/components/tasks/taskForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_store } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Create Task', href: '/tasks/create' },
];

export default function CreateTask() {
    // TODO : date handling

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />

            <div className="flex justify-center p-6">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold">
                            Create a New Task
                        </h1>
                    </CardHeader>

                    <CardContent>
                        <TaskForm
                            action={task_store().url}
                            submitLabel="Create Task"
                        ></TaskForm>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
