import TaskCard from '@/components/tasks/taskCard';
import taskCard from '@/components/tasks/taskCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { about, dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { type Task } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from "date-fns";

interface PageProps {
  tasks: Task[];
  [key: string]: any; // to remove or adapt
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { tasks } = usePage<PageProps>().props

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                
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
                            Open Volonteering Tasks
                        </h1>
                        <div>
                            <p className='text-gray-500'>Feel free to pick one !</p>
                        </div>
                    </div>
                    
                </header>

                <div className="max-w-8xl mx-auto px-4">
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.length > 0 ?  (
                            tasks.map((task) => (
                                <TaskCard task={task} key={task.id}></TaskCard>
                            ))
                        ) : (
                            <p className="text-gray-500">No tasks available yet.</p>
                        )}
                    </div>
                    
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
