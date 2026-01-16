<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function showDashboard(): Response
    {
        $this->authorize('viewAny', Task::class);

        $authenticatedUser = auth()->user();

        $paginatedTasks = Task::query()->where([
            'user_id' => $authenticatedUser->id,
            'active' => true,
        ])
            ->with('user:id,name,profile_picture_path')
            ->orderBy('date_start', 'DESC')
            ->paginate(9);

        return Inertia::render('dashboard', [
            'paginatedTasks' => $paginatedTasks,
        ]);
    }
}
