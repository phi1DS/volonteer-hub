<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\VolunteerAnswer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VolunteerAnswerController extends Controller
{
    public function list(Request $request): Response
    {
        $this->authorize('viewAny', VolunteerAnswer::class);

        $taskFilter = $request->string('task')->trim()->toString();
        $userId = (int) Auth::id();

        $paginatedVolunteerAnswers = VolunteerAnswer::query()
            ->whereHas('task', function ($query) use ($taskFilter, $userId) {
                $query->where('user_id', $userId)
                    ->when($taskFilter, function ($taskQuery) use ($taskFilter) {
                        $taskQuery
                            ->where('subject', 'like', '%'.$taskFilter.'%')
                            ->where('active', true);
                    });
            })
            ->with('task')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('volunteerAnswers/list', [
            'paginatedVolunteerAnswers' => $paginatedVolunteerAnswers,
            'filters' => [
                'task' => $taskFilter,
            ],
        ]);
    }

    public function show(VolunteerAnswer $volunteerAnswer): RedirectResponse|Response
    {
        $this->authorize('view', $volunteerAnswer);

        return Inertia::render('volunteerAnswers/show', [
            'volunteerAnswer' => $volunteerAnswer,
        ]);
    }

    public function update(Request $request, VolunteerAnswer $volunteerAnswer): RedirectResponse
    {
        $this->authorize('update', $volunteerAnswer);

        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $volunteerAnswer->update($validated);

        return back()->with([
            'type' => 'success',
            'message' => 'Notes updated',
        ]);
    }

    public function destroy(VolunteerAnswer $volunteerAnswer): RedirectResponse
    {
        $this->authorize('delete', $volunteerAnswer);

        $volunteerAnswer->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Answer deleted',
        ]);
    }
}

