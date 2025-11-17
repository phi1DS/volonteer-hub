<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VolonteerAnswer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VolonteerAnswerController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'task_id' => ['required', 'integer', 'exists:tasks,id'],
            'message' => ['required', 'string'],
            'name' => ['required', 'string'],
        ]);

        $volonteerAnswer = VolonteerAnswer::create($validated);

        return new JsonResponse([
            'message' => 'Answer submitted successfully',
            'volonteerAnswer' => $volonteerAnswer,
        ], 200);
    }
}

