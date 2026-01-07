<?php

use App\Models\Task;
use App\Models\User;
use App\Models\VolunteerAnswer;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

// Prefixed /e2e

// --- General DB state managing routes

Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
})->name('test');

Route::post('/seed', function () {
    Artisan::call('db:seed', ['--class' => 'E2eDatabaseSeeder']);
    return response()->json(['status' => 'seeded']);
})->name('seed');

Route::post('/reset', function () {
    Artisan::call('migrate:fresh');
    return response()->json(['status' => 'reseted']);
})->name('reset');

Route::post('/reset-seed', function () {
    Artisan::call('migrate:fresh', ['--seed' => true]);
    return response()->json(['status' => 'reset-seeded']);
})->name('reset-seed');

Route::post('/prune-db', function () {
    Artisan::call('app:testing:refresh-and-seed');
    return response()->json(['status' => 'db pruned']);
})->name('dbprune');

// --- Factory routes

Route::prefix('/factory')->name('factory.')->group(function () {
    Route::post('/user', function () {
        $data = request()->all();
        $model = User::factory()->create($data);

        return response()->json($model);
    })->name('user');

    Route::post('/task', function () {
        $data = request()->all();
        $model = Task::factory()->create($data);

        return response()->json($model);
    })->name('task');
    
    Route::post('/volunteer-answer', function () {
        $data = request()->all();
        $model = VolunteerAnswer::factory()->create($data);

        return response()->json($model);
    })->name('volunteer-answer');
});
