<?php

use App\Http\Controllers\HomePageController;
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

Route::get('/homepage', [HomePageController::class, 'homepage'])
    ->name('homepage');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
