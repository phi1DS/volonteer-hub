import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogFooter as DialogActionFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import volunteer_answer from '@/routes/volunteer_answer';
import { useTranslate } from '@/hooks/use-translate';
import { Task } from '@/types/models';
import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

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
    const { __ } = useTranslate();
    const { executeRecaptcha } = useGoogleReCaptcha();
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

        if (!executeRecaptcha) {
            console.error("Recaptcha not loaded")
            return;
        }
        const captchaToken = await executeRecaptcha('contact_form_submit');

        setIsSubmitting(true);

        try {
            router.post(volunteer_answer.store().url, {
                task_id: task.id,
                name: volunteerName,
                message: volunteerMessage,
                captcha_token: captchaToken,
            });

            handleDialogOpenChange(false);
        } catch (error) {
            toast.error(__('Something wrong happened'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {__('Help with')} “{task?.subject ?? __('task')}”
                    </DialogTitle>
                    <DialogDescription>
                        {__('Share a short message with the task owner. They will reach out to you directly. Please put your custom contact information in your message.')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="volunteer-name">{__('Your name')}</Label>
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
                        <Label htmlFor="volunteer-message">{__('Your message')}</Label>
                        <Textarea
                            id="volunteer-message"
                            value={volunteerMessage}
                            onChange={(event) =>
                                setVolunteerMessage(event.target.value)
                            }
                            placeholder={__("I'd be happy to help with...")}
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
                            {__('Cancel')}
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? __('Sending…') : __('Send my answer')}
                        </Button>
                    </DialogActionFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
