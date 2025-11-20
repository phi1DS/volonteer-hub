<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VolunteerAnswer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VolunteerAnswerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'task_id' => ['required', 'integer', 'exists:tasks,id'],
            'message' => ['required', 'string'],
            'name' => ['required', 'string'],
        ]);

        VolunteerAnswer::create($validated);

        return back()->with([
            'type' => 'success',
            'message' => 'Answer sent',
        ]);
    }
}

