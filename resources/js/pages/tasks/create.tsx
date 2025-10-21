import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Form } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Create Task', href: '/tasks/create' },
];

export default function CreateTask() {

	// to update : date handling
	// flashbag
	// letter overflow

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Task" />

    	<div className="flex justify-center p-6">
			<Card className="w-full max-w-md rounded-2xl shadow-md">
			<CardHeader>
				<h1 className="text-2xl font-semibold">Create a New Task</h1>
			</CardHeader>

			<CardContent>

				<Form action="/dashboard/tasks" method="post" className="flex flex-col gap-4">

					<div>
						<Label htmlFor="subject">Sujet *</Label>
						<Input id="name"
							type="text"
							name="subject"
							required
						/>
					</div>

					<div>
						<Label htmlFor="message">Message *</Label>
						<Input
							id="message"
							type="textarea"
							name="message"
							required
						/>
					</div>

					<div>
						<Label htmlFor="organisation">Organisation</Label>
						<Input 
							id="organisation"
							type="text"
							name="organisation"
							placeholder="Nom assocation ou groupe"
						/>
					</div>

					<div>
						<Label htmlFor="contact_information">Contact information *</Label>
						<Input 
							id="contact_information"
							type="text"
							name="contact_information"
							placeholder="Email or phone"
						/>
					</div>

					<div>
						<Label htmlFor="date_start">Date start *</Label>
						<Input
							type="datetime-local"
							name="date_start"
							required
						/>
					</div>

					<div>
						<Label htmlFor="date_end">Date end *</Label>
						<Input
							type="datetime-local"
							name="date_end"
							required
						/>
					</div>

					<Button type="submit" className="mt-4">
						Create Task
					</Button>
				</Form>

			</CardContent>
			</Card>
      	</div>

    </AppLayout>
  );
};