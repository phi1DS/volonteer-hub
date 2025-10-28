<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomePageController::class, 'homepage'])->name('homepage');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/unauthorized', function () {
    return Inertia::render('unauthorized');
})->name('unauthorized');

// ---- Authenticated routes

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'showDashboard'])->name('dashboard');

    // Task routes
    Route::prefix('/dashboard/tasks')->name('tasks.')->group(function () {
        Route::get('/inactive', [TaskController::class, 'showInActiveTasksForUser'])->name('task_inactive');
        
        Route::post('/{task}/resolve', [TaskController::class, 'markTaskAsResolve'])->name('task_resolve');
        Route::post('/{task}/reopen', [TaskController::class, 'reopenTask'])->name('task_reopen');

        Route::get('/{task}/edit', [TaskController::class, 'edit'])->name('task_edit');
        Route::put('/{task}', [TaskController::class, 'update'])->name('task_update');
        
        Route::get('/create', [TaskController::class, 'create'])->name('task_create');
        Route::post('/', [TaskController::class, 'store'])->name('task_store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
