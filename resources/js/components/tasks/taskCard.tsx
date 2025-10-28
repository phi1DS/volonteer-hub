import { getAssetsPath, getDefaultProfilePicturePath } from '@/helpers';
import { Task } from '@/types/models';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import TaskOutdatedNotice from './taskOutdated';

interface TaskCardProps {
    cardFooter?: ReactNode;
    task: Task;
    className?: string;
}

export default function TaskCard({ cardFooter, task, className }: TaskCardProps) {
    const truncate = (text: string, maxLength = 400) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
    };

    let profilePictureUrl = getDefaultProfilePicturePath();
    if (task.user.profile_picture_path !== null) {
        profilePictureUrl = getAssetsPath(task.user.profile_picture_path);
    }

    const now = new Date();
    const dateStart = new Date(task.date_start);

    return (
        <Card className={cn("flex justify-between rounded-xl shadow-sm", className)}>
            <div>
                <CardHeader>
                    <div className="align-center flex justify-start">
                        <img
                            src={profilePictureUrl}
                            alt="Profile preview"
                            className="mr-5 h-10 w-10 rounded-full border object-cover"
                        />
                        <CardTitle className="mt-1">{task.subject}</CardTitle>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                        Organisation : {task.organisation || 'No organisation'}
                    </p>
                    <p className="text-sm text-gray-500">
                        Created By : {task.user?.name ?? 'No user assigned'}
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="mt-4 mb-2 text-gray-700">
                        {truncate(task.message)}
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Contact info : {task.contact_information}
                    </p>
                    <p className="text-sm text-gray-500">
                        From:{' '}
                        {new Date(task.date_start).toLocaleString('fr-FR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}
                    </p>
                    <p className="text-sm text-gray-500">
                        To:{' '}
                        {new Date(task.date_end).toLocaleString('fr-FR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })}
                    </p>
                </CardContent>
            </div>

            { task.active === false && (
                <div className="flex items-center justify-center gap-2 p-2 text-center text-sm text-red-400">
                    <p>
                        Closed Task
                    </p>
                </div>
            )}
            
            { (task.active === true && dateStart < now) && <TaskOutdatedNotice /> }

            {cardFooter}
        </Card>
    );
}
