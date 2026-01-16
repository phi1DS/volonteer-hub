<?php

use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\SidebarController;
use App\Http\Controllers\Backend\TaskController as BackendTaskController;
use App\Http\Controllers\Backend\VolunteerAnswerController as BackendVolunteerAnswerController;
use App\Http\Controllers\Frontend\HomePageController;
use App\Http\Controllers\Frontend\VolunteerAnswerController as FrontendVolunteerAnswerController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ---- FronEnd - Public Routes

Route::get('/', [HomePageController::class, 'homepage'])->name('homepage');
Route::post('/volunteer-answer', [FrontendVolunteerAnswerController::class, 'store'])->name('volunteer_answer.store');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/unauthorized', function () {
    return Inertia::render('unauthorized');
})->name('unauthorized');

// ---- Authenticated Routes

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'showDashboard'])->name('dashboard');

    // VolunteerAnswers Backend Routes
    Route::prefix('/dashboard/volunteer-answer')->name('volunteer_answer_backend.')->group(function () {
        Route::get('/', [BackendVolunteerAnswerController::class, 'list'])->name('volunteer_answer_list');
        Route::get('/{volunteerAnswer}', [BackendVolunteerAnswerController::class, 'show'])->name('volunteer_answer_show');
        Route::delete('/{volunteerAnswer}', [BackendVolunteerAnswerController::class, 'destroy'])->name('volunteer_answer_delete');
    });

    // Tasks Backend Routes
    Route::prefix('/dashboard/tasks')->name('tasks.')->group(function () {
        Route::get('/inactive', [BackendTaskController::class, 'showInActiveTasksForUser'])->name('task_inactive');

        Route::post('/{task}/close', [BackendTaskController::class, 'closeTask'])->name('task_close');
        Route::post('/{task}/reopen', [BackendTaskController::class, 'reopenTask'])->name('task_reopen');

        Route::get('/{task}/edit', [BackendTaskController::class, 'edit'])->name('task_edit');
        Route::put('/{task}', [BackendTaskController::class, 'update'])->name('task_update');

        Route::get('/create', [BackendTaskController::class, 'create'])->name('task_create');
        Route::post('/', [BackendTaskController::class, 'store'])->name('task_store');
    });

    Route::get('/api/sidebar-counts', [SidebarController::class, 'getCounts'])->name('api.sidebar_counts');
});

// ---- Modules Routes

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

if (config('app.env') === 'e2e') { // e2e quick login
    Route::get('/testing/login', function () {
        $user = User::query()->where('name', 'e2eUser')->first();

        Auth::login($user);

        return response()->noContent();
    });
}
