import { PaginatedTasks } from "@/types/models";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { homepage } from "@/routes";

interface PageProps {
  paginatedTasks: PaginatedTasks;
}

export default function TaskPagination ({ paginatedTasks }: PageProps) {

    return (
        <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: paginatedTasks.last_page }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    disabled={page === paginatedTasks.current_page}
                    onClick={() => router.get(paginatedTasks.path + "?page=" + page)}
                >
                    {page}
                </Button>
            ))}
        </div>
    )
}