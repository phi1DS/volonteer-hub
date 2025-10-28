import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function TaskOutdatedNotice() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-2 text-sm text-orange-400 text-center flex items-center justify-center gap-2">
        <p className="cursor-pointer" onClick={() => setOpen(true)}>Outdated task</p>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Outdated Task</DialogTitle>
            <DialogDescription>
              This task’s start date has already passed. It won't be showed on the homepage.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
