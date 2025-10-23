<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function showDashboard(): Response
    {
        $authenticatedUser = auth()->user();

        $tasks = Task::where([
                'user_id' => $authenticatedUser->id,
                'active' => true,
            ])
            ->with('user:id,name')
            ->orderBy('created_at', 'DESC')
            ->get();

        return Inertia::render('dashboard', [
            'tasks' => $tasks,
        ]);
    }

    public function markTaskAsResolve(Request $request, Task $task): RedirectResponse|Response
    {
        if ($task->user_id !== $request->user()->id) {
            return to_route('unauthorized');
        }

        $task->active = false;
        $task->save();

        return to_route('dashboard')->with([
            'type' => 'success',
            'message' => 'Task marked as resolved'
        ]);
    }
}
