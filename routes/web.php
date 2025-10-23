<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about', [
        'title' => 'About Page',
        'description' => 'This is an example of a new Inertia/React page.',
    ]);
})->name('about');

Route::get('/unauthorized', function () {
    return Inertia::render('unauthorized');
})->name('unauthorized');

Route::get('/homepage', [HomePageController::class, 'homepage'])
    ->name('homepage');


// ---- Authenticated routes

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'showDashboard'])->name('dashboard');

     // for intertia aut aliasing generation (avoid '.')

    // Task CRUD routes
    Route::prefix('/dashboard/tasks')->name('tasks.')->group(function () {        
        // Route::get('/inactive', [TaskController::class, 'showInActiveTasksForUser'])->name('task_inactive');
        Route::post('/{task}/resolve', [DashboardController::class, 'markTaskAsResolve'])->name('task_resolve');

        Route::get('/create', [TaskController::class, 'create'])->name('task_create');
        Route::post('/', [TaskController::class, 'store'])->name('task_store');

        Route::get('/{task}/edit', [TaskController::class, 'edit'])->name('task_edit');
        Route::put('/{task}', [TaskController::class, 'update'])->name('task_update');

        Route::delete('/{task}', [TaskController::class, 'destroy'])->name('task_destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
