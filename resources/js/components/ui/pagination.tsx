import { Model, PaginatedModel } from "@/types/models";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { homepage } from "@/routes";

function getPages(total: number, current: number, maxButtons = 6): (number | string)[] {
  const pages: (number | string)[] = [];

  if (total <= maxButtons) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(current - 1, 2);
    let end = Math.min(current + 1, total - 1);

    if (current === 1) end = 3;
    if (current === total) start = total - 2;

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('...');
    pages.push(total);
  }

  return pages;
}

interface PageProps {
  paginatedModel: PaginatedModel<Model>;
  filters: Record<string, string>;
  redirectUrl: string;
}

export default function Pagination ({ paginatedModel, redirectUrl, filters }: PageProps) {

    const current = paginatedModel.current_page;
    const pages = getPages(paginatedModel.last_page, paginatedModel.current_page);

	const handleOnClick = (page: number | string) => {
		if (typeof page === "number") {
			router.get(redirectUrl, { ...filters, page }, { preserveState: true });
		}
	};

	return (
		<div className="flex justify-center mt-4 space-x-2 mb-2">
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
