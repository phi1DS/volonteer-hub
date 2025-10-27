import { about, dashboard, homepage, login, register } from "@/routes";
import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="mb-6 w-full text-sm not-has-[nav]:hidden bg-[#0a0a0a]">
            <nav className="flex items-center justify-between gap-4">

                <Link href={homepage()} className="mr-6">
                    <p className="text-gray-500 font-bold">
                        Vonunteer Hub
                    </p>
                </Link>

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
            
        </header>
    );
} 