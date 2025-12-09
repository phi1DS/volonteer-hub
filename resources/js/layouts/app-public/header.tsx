import { UnderlinedClickable } from '@/components/ui/unerlinedClickable';
import { about, dashboard, homepage, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    const toAboutPage = () => router.get(about());

    return (
        <header className="mb-6 w-full text-sm not-has-[nav]:hidden">
            <nav className="flex items-center justify-between gap-4">

                <div>
                    <Link href={homepage()}>
                        <p className="font-bold text-gray-500">Volunteer Hub</p>
                    </Link>

                    {import.meta.env.VITE_IS_SHOWCASE === 'true' && (
                        <a 
                            className="text-center text-xs text-muted-foreground text-orange-400"
                            href="https://github.com/phi1DS/volonteer-hub" 
                            target='_blank'
                        >
                            Demo Mode | Github repository
                        </a>
                    )}
                </div>

                <div className="flex items-center">
                    <UnderlinedClickable
                        onClick={toAboutPage}
                        buttonText='About'
                        className="mr-4"
                    />

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
