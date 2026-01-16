<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskFormRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function showInActiveTasksForUser(Request $request): Response
    {
        $this->authorize('viewAny', Task::class);

        $validated = $request->validate([
            'subject' => ['nullable', 'string', 'max:255'],
        ]);

        $query = Task::query()->where([
            'user_id' => auth()->user()->id,
            'active' => false,
        ])
            ->with('user:id,name,profile_picture_path')
            ->orderBy('date_start', 'DESC');

        if (isset($validated['subject']) && $validated['subject']) {
            $query->where('subject', 'LIKE', '%'.$validated['subject'].'%');
        }

        $paginatedInactiveTasks = $query->paginate(9);

        return Inertia::render('tasks/inactive', [
            'paginatedInactiveTasks' => $paginatedInactiveTasks,
            'filters' => [
                'subject' => $validated['subject'] ?? '',
            ],
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Task::class);

        return Inertia::render('tasks/create');
    }

    public function store(TaskFormRequest $request): RedirectResponse
    {
        $this->authorize('create', Task::class);

        $validated = $request->validated();

        Task::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return to_route('dashboard')->with([
            'type' => 'success',
            'message' => __('Task created'),
        ]);
    }

    public function edit(Task $task): Response
    {
        $this->authorize('view', $task);

        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    public function update(TaskFormRequest $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $validated = $request->validated();

        $task->update($validated);

        return redirect()->route('dashboard')->with([
            'type' => 'success',
            'message' => __('Task updated'),
        ]);
    }

    public function closeTask(Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $task->active = false;
        $task->save();

        return back()->with([
            'type' => 'success',
            'message' => __('Task marked as closed'),
        ]);
    }

    public function reopenTask(Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $task->active = true;
        $task->save();

        return back()->with([
            'type' => 'success',
            'message' => __('Task marked as reopened'),
        ]);
    }
}
