import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter as DialogActionFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/types/models';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from "sonner";
import volunteer_answer from '@/routes/volunteer_answer';
import { router } from '@inertiajs/react';

interface VolunteerAnswerModalProps {
    open: boolean;
    task: Task | null;
    onOpenChange: (open: boolean) => void;
}

export default function VolunteerAnswerModal({
    open,
    task,
    onOpenChange,
}: VolunteerAnswerModalProps) {
    const [volunteerName, setVolunteerName] = useState('');
    const [volunteerMessage, setVolunteerMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setVolunteerName('');
            setVolunteerMessage('');
            setIsSubmitting(false);
        }
    }, [open]);

    const handleDialogOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
            setTimeout(() => {
                setVolunteerName('');
                setVolunteerMessage('');
            }, 0);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!task) {
            return;
        }

        setIsSubmitting(true);

        try {
            router.post(volunteer_answer.store().url, {
                task_id: task.id,
                name: volunteerName,
                message: volunteerMessage,
            });

            handleDialogOpenChange(false);
        } catch (error) {
            toast.error('Something wrong happened');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Help with “{task?.subject ?? 'task'}”
                    </DialogTitle>
                    <DialogDescription>
                        Share a short message with the task owner. They will reach out to you directly. Please put your custom contact information in your message.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="volunteer-name">Your name</Label>
                        <Input
                            id="volunteer-name"
                            value={volunteerName}
                            onChange={(event) =>
                                setVolunteerName(event.target.value)
                            }
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="volunteer-message">Your message</Label>
                        <Textarea
                            id="volunteer-message"
                            value={volunteerMessage}
                            onChange={(event) =>
                                setVolunteerMessage(event.target.value)
                            }
                            placeholder="I'd be happy to help with..."
                            required
                            rows={5}
                        />
                    </div>

                    <DialogActionFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => handleDialogOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending…' : 'Send my answer'}
                        </Button>
                    </DialogActionFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

