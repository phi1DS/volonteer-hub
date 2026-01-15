import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { useTranslate } from '@/hooks/use-translate';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStorageAssetsPath } from '@/helpers';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import profile, { edit } from '@/routes/profile';
import { useState } from 'react';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const { __ } = useTranslate();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('Profile settings'),
            href: edit().url,
        },
    ];

    console.log(auth.user);

    const [preview, setPreview] = useState<string | null>(
        auth.user.profile_picture_path
            ? getStorageAssetsPath(auth.user.profile_picture_path)
            : null,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('Profile settings')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={__('Profile information')}
                        description={__('Update your informations.')}
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">{__('Name')}</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder={__('Full name')}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">{__('Email address')}</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder={__('Email address')}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                {__('Your email address is unverified.')}{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    {__('Click here to resend the verification email.')}
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    {__('A new verification link has been sent to your email address.')}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        {__('Save')}
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            {__('Saved')}
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* <Form
                        action={profile.picture_update().url}
                        method="post"
                        className="space-y-6"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="profile_picture" className="mb-4">
                                Profile picture
                            </Label>

                            <div className="flex items-center gap-4">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile preview"
                                        className="h-16 w-16 rounded-full border object-cover"
                                    />
                                ) : (
                                    <div className="flex h-16 w-16 items-center rounded-full bg-gray-200 text-center text-sm text-gray-400 dark:bg-neutral-700">
                                        <p>No Image</p>
                                    </div>
                                )}

                                <Input
                                    id="profile_picture"
                                    type="file"
                                    name="profile_picture"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) =>
                                                setPreview(
                                                    event.target
                                                        ?.result as string,
                                                );
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>

                            <div className="mt-3 flex items-center gap-4">
                                <Button>Save</Button>
                            </div>
                        </div>
                    </Form> */}
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
