<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('tasks/create');
    }

    /**
     * Store a new task in the database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'organisation' => ['nullable', 'string', 'max:255'],
            'contact_information' => ['string', 'max:255'],
            'date_start' => ['required', 'date'],
            'date_end' => ['required', 'date', 'after_or_equal:date_start'],
        ]);

        Task::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('dashboard')->with('success', 'Task created successfully.');
    }


    // TO AJUST BELOW ------------------------------------------------------------

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
    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Task updated.');
    }

    /**
     * Delete a specific task.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted.');
    }
}