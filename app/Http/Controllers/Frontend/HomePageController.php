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
        $validatedFilterData = $request->validate([
            'organisationFilter' => ['nullable', 'string', 'max:255'],
            'userFilter' => ['nullable', 'string', 'max:255'],
            'dateSearchStartFilter' => ['nullable', 'date'],
            'dateSearchEndFilter' => ['nullable', 'date'],
        ]);

        $query = Task::query()
            ->with('user:id,name,profile_picture_path')
            ->where([
                'active' => true,
            ])
            ->where('date_start', '>=', now())
            ->orderBy('date_start', 'ASC');

        if (isset($validatedFilterData['organisationFilter']) && $validatedFilterData['organisationFilter'] !== null) {
            $query->where('organisation', 'LIKE', '%'.$validatedFilterData['organisationFilter'].'%');
        }

        if (isset($validatedFilterData['userFilter']) && $validatedFilterData['userFilter'] !== null) {
            $query->whereHas('user', fn ($q) => $q->where('users.name', 'LIKE', '%'.$validatedFilterData['userFilter'].'%'));
        }

        if (
            isset($validatedFilterData['dateSearchStartFilter']) &&
            isset($validatedFilterData['dateSearchEndFilter']) &&
            $validatedFilterData['dateSearchStartFilter'] !== null &&
            $validatedFilterData['dateSearchEndFilter'] !== null
        ) {
            $query->where('date_start', '>=', $validatedFilterData['dateSearchStartFilter']);
            $query->where('date_start', '<=', $validatedFilterData['dateSearchEndFilter']);
        }

        $paginatedTasks = $query->paginate(12);

        return Inertia::render('homepage', [
            'paginatedTasks' => $paginatedTasks,
            'filters' => [
                'organisationFilter' => $validatedFilterData['organisationFilter'] ?? '',
                'userFilter' => $validatedFilterData['userFilter'] ?? '',
                'dateSearchStartFilter' => $validatedFilterData['dateSearchStartFilter'] ?? '',
                'dateSearchEndFilter' => $validatedFilterData['dateSearchEndFilter'] ?? '',
            ]
        ]);
    }
}
