import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/ui/pagination';
import Header from '@/layouts/app-public/header';
import { homepage } from '@/routes';
import { PaginatedModel, Task } from '@/types/models';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import VolunteerAnswerModal from '@/components/tasks/volunteerAnswerModal';
import FlashMessage from '@/components/flashMessage';

type PaginatedTasks = PaginatedModel<Task>;

interface PageProps {
    paginatedTasks: PaginatedTasks;
}

export default function Homepage({ paginatedTasks }: PageProps) {
    // console.log(paginatedTasks);

    const tasks = paginatedTasks.data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [organisationFilter, setOrganisationFilter] = useState('');
    const [userFilter, setUserFilter] = useState('');
    const [dateSearchStartFilter, setDateSearchStartFilter] = useState('');
    const [dateSearchEndFilter, setDateSearchEndFilter] = useState('');

    const handleFilter = () => {
        router.get(
            homepage(),
            {
                organisationFilter,
                userFilter,
                dateSearchStartFilter,
                dateSearchEndFilter,
            },
            { preserveState: true, replace: true },
        );
    };

    const resetFilter = () => {
        setOrganisationFilter('');
        setUserFilter('');
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

    const handleVolunteerSuccess = (message: string) => {
        setSuccessMessage(message);
    };

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
                <Header />

                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-semibold text-white">
                        Opened Volonteering Tasks
                    </h1>
                    <div>
                        <p className="text-gray-500">Feel free to pick one !</p>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-4">
                    {successMessage && (
                        <FlashMessage
                            message={successMessage}
                            type={'success'}
                        />
                    )}
                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap items-end justify-center gap-4 pb-4 text-gray-500">
                        <div>
                            <Label htmlFor="organisationFilter">
                                Organisation
                            </Label>
                            <Input
                                id="organisationFilter"
                                value={organisationFilter}
                                onChange={(e) =>
                                    setOrganisationFilter(e.target.value)
                                }
                                placeholder="e.g. Green Peace"
                                className="w-48"
                            />
                        </div>
                        <div>
                            <Label htmlFor="userFilter">Created By</Label>
                            <Input
                                id="userFilter"
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                placeholder="e.g. John"
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
                                className="w-48"
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
                                className="w-48"
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.length > 0 ? (
                            tasks.map((task) => {
                                const footer = (
                                    <CardFooter className="mt-auto w-full justify-end">
                                        <Button
                                            type="button"
                                            className="w-full bg-secondary text-white hover:bg-secondary/80"
                                            onClick={() => handleOpenModal(task)}
                                        >
                                            I want to help
                                        </Button>
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

                    {/* Pagination */}
                    <Pagination
                        paginatedModel={paginatedTasks}
                        redirectUrl={homepage().url}
                        filters={{
                            organisationFilter,
                            userFilter,
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
                onSuccess={handleVolunteerSuccess}
            />
        </>
    );
}
