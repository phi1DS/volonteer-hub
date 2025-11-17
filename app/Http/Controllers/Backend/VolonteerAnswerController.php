<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\VolonteerAnswer;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VolonteerAnswerController extends Controller
{
    public function list(): Response
    {
        $paginatedVolonteerAnswers = VolonteerAnswer::query()->whereHas('task', function ($query) {
            $query->where('user_id', auth()->user()->id);
        })->with('task')->paginate(10);

        return Inertia::render('volonteerAnswers/list', [
            'paginatedVolonteerAnswers' => $paginatedVolonteerAnswers,
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

