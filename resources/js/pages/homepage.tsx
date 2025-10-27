import TaskCard from '@/components/tasks/taskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { about, dashboard, homepage, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { PaginatedTasks, type Task } from '@/types/models';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import Header from '@/layouts/app-public/header';

interface PageProps {
  paginatedTasks: PaginatedTasks;
}

export default function Homepage({ paginatedTasks }: PageProps) {

    const { auth } = usePage<SharedData>().props;
    // console.log(paginatedTasks);

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
            { preserveState: true, replace: true }
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
                
                <Header />
                
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-semibold mb-4 text-white">
                        Opened Volonteering Tasks
                    </h1>
                    <div>
                        <p className='text-gray-500'>Feel free to pick one !</p>
                    </div>
                </div>

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
                                <TaskCard task={task} key={task.id}/>
                            ))
                        ) : (
                            <p className="text-gray-500">No tasks available yet.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        paginatedModel={paginatedTasks}
                        filters={{
                            organisationFilter,
                            userFilter,
                            dateSearchStartFilter,
                            dateSearchEndFilter,
                    }}/>
                    
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
