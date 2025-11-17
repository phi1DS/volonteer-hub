<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Requests\TaskFormRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function showInActiveTasksForUser(): Response
    {
        $authenticatedUser = auth()->user();

        $paginatedInactiveTasks = Task::where([
            'user_id' => $authenticatedUser->id,
            'active' => false,
        ])
            ->with('user:id,name,profile_picture_path')
            ->orderBy('created_at', 'DESC')
            ->paginate(9);

        return Inertia::render('tasks/inactive', [
            'paginatedInactiveTasks' => $paginatedInactiveTasks,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('tasks/create');
    }

    /**
     * Store a new task in the database.
     */
    public function store(TaskFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Task::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return to_route('dashboard')->with([
            'type' => 'success',
            'message' => 'Task created',
        ]);
    }

    /**
     * Show the form for editing a task.
     */
    public function edit(Task $task): Response
    {
        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    /**
     * Update a specific task.
     */
    public function update(TaskFormRequest $request, Task $task): RedirectResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return to_route('unauthorized');
        }

        $validated = $request->validated();

        $task->update($validated);

        return redirect()->route('dashboard')->with([
            'type' => 'success',
            'message' => 'Task updated',
        ]);
    }

    public function markTaskAsResolve(Request $request, Task $task): RedirectResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return to_route('unauthorized');
        }

        $task->active = false;
        $task->save();

        return to_route('dashboard')->with([
            'type' => 'success',
            'message' => 'Task marked as resolved',
        ]);
    }

    public function reopenTask(Request $request, Task $task): RedirectResponse
    {
        if ($task->user_id !== $request->user()->id) {
            return to_route('unauthorized');
        }

        $task->active = true;
        $task->save();

        return to_route('task_inactive')->with([
            'type' => 'success',
            'message' => 'Task reopened',
        ]);
    }
}
