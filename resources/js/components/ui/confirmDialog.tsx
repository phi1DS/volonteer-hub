import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslate } from '@/hooks/use-translate';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const { __ } = useTranslate();
    const finalTitle = title || __("Confirmation");
    const finalConfirmLabel = confirmLabel || __("Confirm");
    const finalCancelLabel = cancelLabel || __("Cancel");

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{finalTitle}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onCancel}>
                        {finalCancelLabel}
                    </Button>
                    <Button onClick={onConfirm}>
                        {finalConfirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
