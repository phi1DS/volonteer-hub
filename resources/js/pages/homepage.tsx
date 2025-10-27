import TaskCard from '@/components/tasks/taskCard';
import TaskPagination from '@/components/tasks/taskPagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { about, dashboard, homepage, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { PaginatedTasks, type Task } from '@/types/models';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageProps {
  paginatedTasks: PaginatedTasks;
}

export default function Homepage({ paginatedTasks }: PageProps) {
    const { auth } = usePage<SharedData>().props;

    console.log(paginatedTasks);

    const tasks = paginatedTasks.data;


    const [organisationFilter, setOrganisationFilter] = useState("");
    const [userFilter, setUserFilter] = useState("");
    const [dateSearchStartFilter, setDateSearchStartFilter] = useState("");
    const [dateSearchEndFilter, setDateSearchEndFilter] = useState("");

    const handleFilter = () => {
        router.get(
            homepage(),
            {
                organisationFilter,
                userFilter,
                dateSearchStartFilter,
                dateSearchEndFilter,
            },
            { preserveState: true, replace: true } // check what this is for
        );
    };

    const resetFilter = () => {
        setOrganisationFilter("");
        setUserFilter("");
        setDateSearchStartFilter("");
        setDateSearchEndFilter("");
        router.get(homepage(), {}, { replace: true });
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
                
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden bg-[#0a0a0a]">
                    <nav className="flex items-center justify-between gap-4">
                        <div>
                            <p className='text-gray-500 font-bold'>Vonunteer Hub</p>
                        </div>

                        <div className="flex items-center">
                            <Link href={about()} className="mr-6">
                                <p className="text-muted-foreground text-sm font-normal underline">
                                    About
                                </p>
                            </Link>

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold mb-8 text-white mb-0">
                            Opened Volonteering Tasks
                        </h1>
                        <div>
                            <p className='text-gray-500'>Feel free to pick one !</p>
                        </div>
                    </div>
                    
                </header>

                <div className="max-w-8xl mx-auto px-4">

                    {/* Filters */}
                    <div className="flex flex-wrap items-end gap-4 pb-4 text-gray-500 mb-8 justify-center">
                        <div>
                            <Label htmlFor="organisationFilter">Organisation</Label>
                            <Input
                                id="organisationFilter"
                                value={organisationFilter}
                                onChange={(e) => setOrganisationFilter(e.target.value)}
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
                                onChange={(e) => setDateSearchStartFilter(e.target.value)}
                                className="w-48"
                            />
                        </div>
                        <div>
                            <Label htmlFor="dateSearchEnd">To</Label>
                            <Input
                                id="dateSearchEnd"
                                type="date"
                                value={dateSearchEndFilter}
                                onChange={(e) => setDateSearchEndFilter(e.target.value)}
                                className="w-48"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button
                                variant="secondary"
                                onClick={resetFilter}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                    
                    {/* Table */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.length > 0 ?  (
                            tasks.map((task) => (
                                <TaskCard task={task} key={task.id}></TaskCard>
                            ))
                        ) : (
                            <p className="text-gray-500">No tasks available yet.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <TaskPagination paginatedTasks={paginatedTasks}></TaskPagination>

                    {/* <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({ length: paginatedTasks.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                disabled={page === paginatedTasks.current_page}
                                onClick={() => router.get(homepage().url + "?page=" + page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div> */}
                    
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
