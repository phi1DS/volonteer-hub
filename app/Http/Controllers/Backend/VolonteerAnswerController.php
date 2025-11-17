<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\VolonteerAnswer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VolonteerAnswerController extends Controller
{
    public function list(Request $request): Response
    {
        $taskFilter = $request->string('task')->trim()->toString();
        $userId = (int) Auth::id();

        $paginatedVolonteerAnswers = VolonteerAnswer::query()
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

        return Inertia::render('volonteerAnswers/list', [
            'paginatedVolonteerAnswers' => $paginatedVolonteerAnswers,
            'filters' => [
                'task' => $taskFilter,
            ],
        ]);
    }

    public function show(VolonteerAnswer $volonteerAnswer): RedirectResponse|Response
    {
        $volonteerAnswer->load('task');

        $isVoloneerAnswerAssociatedToAuthUser = $volonteerAnswer->task && $volonteerAnswer->task->user_id === auth()->user()->id;
        if (! $isVoloneerAnswerAssociatedToAuthUser) {
            return to_route('unauthorized');
        }

        return Inertia::render('volonteerAnswers/show', [
            'volonteerAnswer' => $volonteerAnswer,
        ]);
    }
}

