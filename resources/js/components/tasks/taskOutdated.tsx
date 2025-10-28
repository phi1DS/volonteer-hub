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
            <div className="flex items-center justify-center gap-2 p-2 text-center text-sm text-orange-400">
                <p className="cursor-pointer" onClick={() => setOpen(true)}>
                    Outdated task
                </p>
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
