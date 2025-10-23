<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\TaskFormRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function showInActiveTasksForUser(): Response
    {
        $authenticatedUser = auth()->user();

        $tasks = Task::where([
                'user_id' => $authenticatedUser->id,
                'active' => false
            ])
            ->with('user:id,name')
            ->orderBy('date_start', 'DESC')
            ->get();

        return Inertia::render('task/inactive', [
            'tasks' => $tasks,
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
            'message' => 'Task created'
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
            'message' => 'Task updated'
        ]);
    }


    // TO AJUST BELOW ------------------------------------------------------------

    /**
     * Delete a specific task.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted.');
    }
}