<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\VolunteerAnswer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VolunteerAnswerController extends Controller
{
    protected function isVolunteerAnswerLinkedToAuthUser(VolunteerAnswer $volunteerAnswer): bool {
        $volunteerAnswer->loadMissing('task');
        if (! $volunteerAnswer->task && $volunteerAnswer->task->user_id === Auth::id()) {
            return false;
        }

        return true;
    }

    public function list(Request $request): Response
    {
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
        if (! $this->isVolunteerAnswerLinkedToAuthUser($volunteerAnswer)) {
            return to_route('unauthorized');
        }

        return Inertia::render('volunteerAnswers/show', [
            'volunteerAnswer' => $volunteerAnswer,
        ]);
    }

    public function destroy(VolunteerAnswer $volunteerAnswer): RedirectResponse
    {
        if (! $this->isVolunteerAnswerLinkedToAuthUser($volunteerAnswer)) {
            return to_route('unauthorized');
        }

        $volunteerAnswer->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Answer deleted',
        ]);
    }
}

