import TaskForm from '@/components/tasks/taskForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useTranslate } from '@/hooks/use-translate';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { task_store } from '@/routes/tasks';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function CreateTask() {
    // TODO : date handling
    const { __ } = useTranslate();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: __('Dashboard'), href: dashboard().url },
        { title: __('Create Task'), href: '/tasks/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('Create Task')} />

            <div className="flex justify-center p-6">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardHeader>
                        <h1 className="text-2xl font-semibold">
                            {__('Create a New Task')}
                        </h1>
                    </CardHeader>

                    <CardContent>
                        <TaskForm
                            action={task_store().url}
                            submitLabel={__('Create Task')}
                        ></TaskForm>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
