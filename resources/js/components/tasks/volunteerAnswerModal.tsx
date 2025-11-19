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
import httpClient, { isAxiosError } from '@/lib/axios';
import { Task } from '@/types/models';
import { FormEvent, useEffect, useState } from 'react';

interface VolunteerAnswerModalProps {
    open: boolean;
    task: Task | null;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (message: string) => void;
}

const successMessage =
    'Thank you! Your answer has been shared with the task owner.';

export default function VolunteerAnswerModal({
    open,
    task,
    onOpenChange,
    onSuccess,
}: VolunteerAnswerModalProps) {
    const [volunteerName, setVolunteerName] = useState('');
    const [volunteerMessage, setVolunteerMessage] = useState('');
    const [modalError, setModalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setVolunteerName('');
            setVolunteerMessage('');
            setModalError(null);
            setIsSubmitting(false);
        }
    }, [open]);

    const handleDialogOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
            setTimeout(() => {
                setVolunteerName('');
                setVolunteerMessage('');
                setModalError(null);
            }, 0);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!task) {
            return;
        }

        setIsSubmitting(true);
        setModalError(null);

        try {
            await httpClient.post('/volunteer-answer', {
                task_id: task.id,
                name: volunteerName,
                message: volunteerMessage,
            });

            onSuccess?.(successMessage);
            handleDialogOpenChange(false);
        } catch (error) {
            setModalError(
                isAxiosError(error)
                    ? (() => {
                          const payload = error.response?.data as {
                              message?: string;
                              errors?: Record<string, string[]>;
                          } | null;

                          if (payload?.errors) {
                              const firstError = Object.values(payload.errors)
                                  .flat()
                                  .find(
                                      (errorMessage) =>
                                          typeof errorMessage === 'string',
                                  );

                              if (firstError) {
                                  return firstError;
                              }
                          }

                          return (
                              payload?.message ??
                              'Unable to submit your answer. Please try again.'
                          );
                      })()
                    : 'An unexpected error occurred. Please try again.',
            );
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

                    {modalError && (
                        <p className="text-sm text-red-500">{modalError}</p>
                    )}

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

