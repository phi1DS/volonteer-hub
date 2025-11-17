<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VolunteerAnswer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VolunteerAnswerController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'task_id' => ['required', 'integer', 'exists:tasks,id'],
            'message' => ['required', 'string'],
            'name' => ['required', 'string'],
        ]);

        $volunteerAnswer = VolunteerAnswer::create($validated);

        return new JsonResponse([
            'message' => 'Answer submitted successfully',
            'volunteerAnswer' => $volunteerAnswer,
        ], 200);
    }
}

