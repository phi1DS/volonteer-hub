import Header from '@/layouts/app-public/header';
import { homepage, login, register } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 dark:bg-[#0a0a0a]">

        <Header />

        <div className="flex flex-col items-center justify-center bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] p-6">
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-3xl font-bold">About Volunteer Hub</h1>

                <p className="text-gray-600 dark:text-gray-400">
                    Volunteer Hub is a community platform where anyone can discover and share 
                    volunteering opportunities. Whether you want to help a local organisation 
                    or start your own project, this is the place to connect with people who care.
                </p>

                <p className="text-gray-600 dark:text-gray-400">
                    You can browse all current volunteering offers on the{" "}
                    <Link
                        href={homepage()}
                        className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                        homepage
                    </Link>
                    .  
                    To create your own volunteering offers, simply{" "}
                    <Link
                        href={register()}
                        className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                        register for a free account
                    </Link>.
                </p>

            </div>
        </div>
    </div>
  );
}
