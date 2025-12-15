<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userName = 'basicUser';
        
        if(! User::query()->where('name', $userName)->exists()) {
            User::factory()->create([
                'name' => $userName,
                'password' => Hash::make('testpassword'),
            ]);
        }

        Task::factory()->count(20)->create();
    }
}
