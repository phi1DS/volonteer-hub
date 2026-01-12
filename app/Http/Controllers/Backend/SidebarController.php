<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\VolunteerAnswer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SidebarController extends Controller
{
    public function getCounts(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'openedTasks' => $user ? Task::where('user_id', $user->id)->where('active', true)->count() : 0,
            'closedTasks' => $user ? Task::where('user_id', $user->id)->where('active', false)->count() : 0,
            'volunteerAnswers' => $user ? VolunteerAnswer::whereHas('task', fn($q) => $q->where('user_id', $user->id))->count() : 0,
        ]);
    }
}
