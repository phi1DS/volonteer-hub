import Header from '@/layouts/app-public/header';
import { homepage, register } from '@/routes';
import { Link } from '@inertiajs/react';

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">
            <Header />

            <div className="flex flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="max-w-2xl space-y-6 text-center">
                    <h1 className="text-3xl font-bold">About Volunteer Hub</h1>

                    <p className="text-gray-600 dark:text-gray-400">
                        Volunteer Hub is a community platform where anyone can
                        discover and share volunteering opportunities. Whether
                        you want to help a local organisation or start your own
                        project, this is the place to connect with people who
                        care.
                    </p>

                    <p className="text-gray-600 dark:text-gray-400">
                        You can browse all current volunteering offers on the{' '}
                        <Link
                            href={homepage()}
                            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        >
                            homepage
                        </Link>
                        . To create your own volunteering offers, simply{' '}
                        <Link
                            href={register()}
                            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        >
                            register for a free account
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
