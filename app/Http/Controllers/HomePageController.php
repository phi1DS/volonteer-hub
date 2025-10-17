<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;

class HomePageController extends Controller
{
    public function homepage(): Response
    {
        $tasks = Task::with('user:id,name')
            ->orderBy('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('homepage', [
            'tasks' => $tasks,
        ]);
    }
}
