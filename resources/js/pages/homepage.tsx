import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
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
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
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
                    </nav>
                </header>
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl font-semibold mb-8 text-gray-800">
                    Latest Tasks
                    </h1>

                    {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks yet.</p>
                    ) : (
                    <div className="grid gap-4">
                        {tasks.map((task) => (
                        <Card key={task.id} className="shadow-sm hover:shadow-md transition">
                            <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-medium">
                                {task.title}
                            </CardTitle>
                            <Badge variant="secondary">
                                {task.user?.name ?? "Unknown"}
                            </Badge>
                            </CardHeader>

                            <CardContent className="text-sm text-gray-500 flex items-center justify-between">
                            <span>
                                Created{" "}
                                {formatDistanceToNow(new Date(task.created_at), {
                                addSuffix: true,
                                })}
                            </span>
                            <Button size="sm" variant="outline">
                                View
                            </Button>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    )}
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
