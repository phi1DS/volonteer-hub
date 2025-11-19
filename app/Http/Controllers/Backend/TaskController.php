<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Requests\TaskFormRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function showInActiveTasksForUser(): Response
    {
        $paginatedInactiveTasks = Task::where([
            'user_id' => auth()->user()->id,
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

    public function edit(Task $task): Response
    {
        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

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

    public function closeTask(Task $task): JsonResponse
    {
        if ($task->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->active = false;
        $task->save();

        return response()->json([
            'success' => true,
            'message' => 'Task marked as resolved',
        ]);
    }

    public function reopenTask(Task $task): RedirectResponse|JsonResponse
    {
        if ($task->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->active = true;
        $task->save();

        return response()->json([
            'success' => true,
            'message' => 'Task marked as reopened',
        ]);
    }
}
