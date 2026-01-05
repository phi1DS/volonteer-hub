<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/testing/login', function () {
    $user = User::query()->where('name', 'e2eUser')->first();

    Auth::login($user);

    return response()->noContent();
});
