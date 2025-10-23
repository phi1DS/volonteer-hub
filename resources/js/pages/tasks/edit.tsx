import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Task } from '@/types/models';
import { task_update } from '@/routes/tasks';
import TaskForm from './taskForm';

interface EditTaskProps {
  task: Task;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Edit Task', href: '/tasks/edit' },
];

export default function EditTask({ task }: EditTaskProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Task - ${task.subject}`} />

      <div className="flex justify-center p-6">
        <Card className="w-full max-w-md rounded-2xl shadow-md">
          <CardHeader>
            <h1 className="text-2xl font-semibold">Edit Task</h1>
          </CardHeader>

          <CardContent>
            <TaskForm
                action={task_update(task.id).url} 
                method="put"
                task={task} 
                submitLabel="Update Task">
            </TaskForm>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}