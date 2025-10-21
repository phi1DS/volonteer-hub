<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function showDashboard(Request $request): Response
    {
        $authenticatedUser = $request->user();

        $tasks = Task::where('user_id', $authenticatedUser->id)
            ->where('active', true)
            ->get();

        return Inertia::render('dashboard', [
            'tasks' => $tasks,
        ]);
    }
}
