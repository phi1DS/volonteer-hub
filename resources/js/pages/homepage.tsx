import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/ui/pagination';
import { UnderlinedClickable } from '@/components/ui/unerlinedClickable';
import VolunteerAnswerModal from '@/components/volunteerAnswer/volunteerAnswerModal';
import Header from '@/layouts/app-public/header';
import PublicLayout from '@/layouts/public-layout';
import { homepage } from '@/routes';
import { PaginatedModel, Task } from '@/types/models';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type PaginatedTasks = PaginatedModel<Task>;

interface PageProps {
    paginatedTasks: PaginatedTasks;
    filters: {
        organisationFilter: string;
        userFilter: string;
        dateSearchStartFilter: string;
        dateSearchEndFilter: string;
    };
}

export default function Homepage({ paginatedTasks, filters }: PageProps) {
    const tasks = paginatedTasks.data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [textFilter, setTextFilter] = useState(filters?.userFilter ?? '');
    const [dateSearchStartFilter, setDateSearchStartFilter] = useState(
        filters?.dateSearchStartFilter ?? '',
    );
    const [dateSearchEndFilter, setDateSearchEndFilter] = useState(
        filters?.dateSearchEndFilter ?? '',
    );

    const handleFilter = () => {
        router.get(
            homepage(),
            {
                textFilter,
                dateSearchStartFilter,
                dateSearchEndFilter,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilter = () => {
        setTextFilter('');
        setDateSearchStartFilter('');
        setDateSearchEndFilter('');
        router.get(homepage(), {}, { replace: true });
    };

    const handleOpenModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleDialogOpenChange = (open: boolean) => {
        setIsModalOpen(open);
        if (!open) {
            setSelectedTask(null);
        }
    };

    return (
        <PublicLayout>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:p-8 dark:bg-[#0a0a0a]">
                <Header />

                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-semibold">
                        Opened Volunteering Tasks
                    </h1>
                    <div>
                        <p className="text-gray-500">Feel free to pick one !</p>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-4">
                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap items-end justify-center gap-4 pb-4 text-gray-500">
                        <div>
                            <Label htmlFor="textFilter">Text</Label>
                            <Input
                                id="textFilter"
                                value={textFilter}
                                onChange={(e) => setTextFilter(e.target.value)}
                                placeholder="e.g. Grass cutting"
                                className="w-48"
                            />
                        </div>
                        <div>
                            <Label htmlFor="dateSearchStartFilter">From</Label>
                            <Input
                                id="dateSearchStartFilter"
                                type="date"
                                value={dateSearchStartFilter}
                                onChange={(e) =>
                                    setDateSearchStartFilter(e.target.value)
                                }
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div>
                            <Label htmlFor="dateSearchEnd">To</Label>
                            <Input
                                id="dateSearchEnd"
                                type="date"
                                value={dateSearchEndFilter}
                                onChange={(e) =>
                                    setDateSearchEndFilter(e.target.value)
                                }
                                min={
                                    dateSearchStartFilter
                                        ? dateSearchStartFilter
                                        : new Date().toISOString().split('T')[0]
                                }
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button variant="secondary" onClick={resetFilter}>
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {tasks.length > 0 ? (
                            tasks.map((task) => {
                                const footer = (
                                    <CardFooter className="mt-auto w-full justify-center">
                                        <UnderlinedClickable
                                            onClick={() => handleOpenModal(task)}
                                            buttonText='I want to help'
                                        />
                                    </CardFooter>
                                );

                                return (
                                    <TaskCard
                                        task={task}
                                        key={task.id}
                                        cardFooter={footer}
                                    />
                                );
                            })
                        ) : (
                            <p className="text-gray-500">
                                No tasks available yet.
                            </p>
                        )}
                    </div>

                    <Pagination
                        paginatedModel={paginatedTasks}
                        redirectUrl={homepage().url}
                        filters={{
                            textFilter,
                            dateSearchStartFilter,
                            dateSearchEndFilter,
                        }}
                    />
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>

            <VolunteerAnswerModal
                open={isModalOpen}
                task={selectedTask}
                onOpenChange={handleDialogOpenChange}
            />
        </PublicLayout>
    );
}
