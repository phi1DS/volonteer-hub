import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Create Task', href: '/tasks/create' },
];

export default function CreateTask() {
  const [form, setForm] = useState({
    subject: '',
    message: '',
    organisation: '',
    contact_information: '',
    date_start: '',
    date_end: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // watch intertia form tuto https://inertiajs.com/forms

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.post('/tasks', form, {
            onError: (err: { [key: string]: string[] }) => {
                const mapped = Object.fromEntries(
                    Object.entries(err).map(([key, val]) => [key, val[0]])
                );
                setErrors(mapped);
            },
        });
    };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Task" />
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-white shadow-md">
        <h1 className="text-xl font-semibold">Create a New Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
            {errors.subject && <span className="text-red-500">{errors.subject}</span>}
          </div>

          <div>
            <label className="block font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
            {errors.message && <span className="text-red-500">{errors.message}</span>}
          </div>

          <div>
            <label className="block font-medium">Organisation</label>
            <input
              type="text"
              name="organisation"
              value={form.organisation}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
            {errors.organisation && <span className="text-red-500">{errors.organisation}</span>}
          </div>

          <div>
            <label className="block font-medium">Contact Information</label>
            <input
              type="text"
              name="contact_information"
              value={form.contact_information}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
            {errors.contact_information && (
              <span className="text-red-500">{errors.contact_information}</span>
            )}
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Start Date</label>
              <input
                type="datetime-local"
                name="date_start"
                value={form.date_start}
                onChange={handleChange}
                className="mt-1 border rounded px-3 py-2"
              />
              {errors.date_start && <span className="text-red-500">{errors.date_start}</span>}
            </div>

            <div>
              <label className="block font-medium">End Date</label>
              <input
                type="datetime-local"
                name="date_end"
                value={form.date_end}
                onChange={handleChange}
                className="mt-1 border rounded px-3 py-2"
              />
              {errors.date_end && <span className="text-red-500">{errors.date_end}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Task
          </button>
        </form>
      </div>
    </AppLayout>
  );
}
