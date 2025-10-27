import { PaginatedModel } from "@/types/models";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { homepage } from "@/routes";

interface PageProps {
  paginatedModel: PaginatedModel;
  filters: Record<string, any>;
}

export default function Pagination ({ paginatedModel, filters }: PageProps) {

    const total = paginatedModel.last_page;
    const current = paginatedModel.current_page;
    const maxButtons = 6;
    const pages: (number | string)[] = [];

    if (total <= maxButtons) { // Show all pages if they fit
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1); // Always show first and last pages

      let start = Math.max(current - 1, 2);
      let end = Math.min(current + 1, total - 1);

      if (current === 1) end = 3; // Adjust if current is near start
      if (current === total) start = total - 2; // Adjust if current is near end

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }

	const handleOnClick = (page: number | string) => {
		if (typeof page === "number") {
			router.get(homepage().url, { ...filters, page }, { preserveState: true });
		}
	};

	return (
		<div className="flex justify-center mt-4 space-x-2">
			{
				pages.map((page, index) =>
					page === '...' ? (
						<span key={index} className="px-3 py-1 text-white">
						...
						</span>
					) : (
						<Button
							key={index}
							disabled={page === current}
							onClick={() => handleOnClick(page)}
						>
							{page}
						</Button>
					)
				)
			}
		</div>
	);
}
