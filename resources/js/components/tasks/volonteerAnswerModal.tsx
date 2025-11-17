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

interface VolonteerAnswerModalProps {
    open: boolean;
    task: Task | null;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (message: string) => void;
}

const successMessage = 'Thank you ! Your answer has been shared with the task owner.';

export default function VolonteerAnswerModal({
    open,
    task,
    onOpenChange,
    onSuccess,
}: VolonteerAnswerModalProps) {
    const [volonteerName, setVolonteerName] = useState('');
    const [volonteerMessage, setVolonteerMessage] = useState('');
    const [modalError, setModalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setVolonteerName('');
            setVolonteerMessage('');
            setModalError(null);
            setIsSubmitting(false);
        }
    }, [open]);

    const handleDialogOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);
        if (!nextOpen) {
            setTimeout(() => {
                setVolonteerName('');
                setVolonteerMessage('');
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
            await httpClient.post('/volonteer-answer', {
                task_id: task.id,
                name: volonteerName,
                message: volonteerMessage,
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
                        Share a short message with the task owner. They will
                        reach out to you directly using the contact information
                        provided in the task.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="volonteer-name">Your name</Label>
                        <Input
                            id="volonteer-name"
                            value={volonteerName}
                            onChange={(event) =>
                                setVolonteerName(event.target.value)
                            }
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="volonteer-message">Your message</Label>
                        <Textarea
                            id="volonteer-message"
                            value={volonteerMessage}
                            onChange={(event) =>
                                setVolonteerMessage(event.target.value)
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

