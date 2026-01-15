import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslate } from '@/hooks/use-translate';
import { Task } from '@/types/models';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

interface TaskFormProps {
    action: string;
    method?: 'post' | 'put';
    task?: Partial<Task>;
    submitLabel?: string;
}

export default function TaskForm({
    action,
    method = 'post',
    task = {},
    submitLabel,
}: TaskFormProps) {
    const { __ } = useTranslate();
    const finalSubmitLabel = submitLabel || __('Save Task');
    const [startDate, setStartDate] = useState(
        task.date_start
            ? new Date(task.date_start).toISOString().slice(0, 16)
            : '',
    );

    return (
        <Form action={action} method="post" className="flex flex-col gap-4">
            {/* Laravel PUT method override if needed */}
            {method === 'put' && (
                <input type="hidden" name="_method" value="put" />
            )}

            <div>
                <Label htmlFor="subject">{__('Subject')} *</Label>
                <Input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    defaultValue={task.subject ?? ''}
                />
            </div>

            <div>
                <Label htmlFor="message">{__('Message')} *</Label>
                <div className="grid w-full gap-2">
                    <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder={__('Describe your task...')}
                        defaultValue={task.message ?? ''}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="organisation">{__('Organisation')}</Label>
                <Input
                    id="organisation"
                    type="text"
                    name="organisation"
                    placeholder={__('Association or group name')}
                    defaultValue={task.organisation ?? ''}
                />
            </div>

            <div>
                <Label htmlFor="contact_information">
                    {__('Contact information')} *
                </Label>
                <Input
                    id="contact_information"
                    type="text"
                    name="contact_information"
                    placeholder={__('Email or phone')}
                    required
                    defaultValue={task.contact_information ?? ''}
                />
            </div>

            <div>
                <Label htmlFor="date_start">{__('Date start')} *</Label>
                <Input
                    type="datetime-local"
                    name="date_start"
                    required
                    defaultValue={startDate}
                />
            </div>

            <div>
                <Label htmlFor="date_end">{__('Date end')} *</Label>
                <Input
                    type="datetime-local"
                    name="date_end"
                    required
                    defaultValue={
                        task.date_end
                            ? new Date(task.date_end).toISOString().slice(0, 16)
                            : ''
                    }
                    min={startDate}
                />
            </div>

            <Button type="submit" className="mt-4">
                {finalSubmitLabel}
            </Button>
        </Form>
    );
}
