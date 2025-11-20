import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function TaskOutdatedNotice() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='pt-2 px-6'>
                <div className='p-2 bg-orange-800 rounded-xs text-xs inline-block cursor-pointer' onClick={() => setOpen(true)}>
                    Outdated Task
                </div>
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Outdated Task</DialogTitle>
                        <DialogDescription>
                            This task’s start date has already passed. It won't
                            be showed on the homepage.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
