<?php

declare(strict_types=1);

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class HomePageController extends Controller
{
    public function homepage(Request $request): Response|RedirectResponse
    {
        $filters = $request->validate([
            'textFilter' => ['nullable', 'string', 'max:255'],
            'dateSearchStartFilter' => ['nullable', 'date'],
            'dateSearchEndFilter' => ['nullable', 'date'],
        ]);

        $query = Task::query()
            ->with('user:id,name,profile_picture_path')
            ->where('active', true)
            ->where('date_start', '>=', now())
            ->orderBy('date_start', 'ASC')

        // Text search filter
            ->when($filters['textFilter'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('subject', 'LIKE', "%{$search}%")
                        ->orWhere('organisation', 'LIKE', "%{$search}%")
                        ->orWhereHas('user', fn ($u) => $u->where('name', 'LIKE', "%{$search}%")
                        );
                });
            })

        // Date start filter
            ->when($start = $filters['dateSearchStartFilter'] ?? null,
                fn ($q) => $q->where('date_start', '>=', $start)
            )

        // Date end filter
            ->when($end = $filters['dateSearchEndFilter'] ?? null,
                fn ($q) => $q->where('date_start', '<=', $end)
            );

        $paginatedTasks = $query->paginate(12);

        return Inertia::render('homepage', [
            'paginatedTasks' => $paginatedTasks,
            'filters' => [
                'organisationFilter' => $filters['organisationFilter'] ?? '',
                'userFilter' => $filters['userFilter'] ?? '',
                'dateSearchStartFilter' => $filters['dateSearchStartFilter'] ?? '',
                'dateSearchEndFilter' => $filters['dateSearchEndFilter'] ?? '',
            ],
        ]);
    }
}
