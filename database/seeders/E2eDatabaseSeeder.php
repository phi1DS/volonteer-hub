<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class E2eDatabaseSeeder extends Seeder
{
    /**
     * Run the database e2e seeds.
     * 
     * Creates the data used to run e2e tests
     * 
     * (should be converted into test specific CRUD apis if becomes to big)
     * 
     * command to setup e2e DB (with migrations): php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder
     * command to setup e2e DB: php artisan app:refresh-and-seed
     */
    public function run(): void
    {
        // basic seeding

        $userName = 'e2eUser';
        $userEmail = 'e2eUser@test.com';
        $user = User::factory()->create([
            'name' => $userName,
            'email' => $userEmail,
            'password' => 'testpassword',
        ]);

        // user-close-task

        Task::factory()->for($user)->create([
            'subject' => "Help with furniture",
        ]);

        // user-see-task

        Task::factory()->for($user)->create([
            'subject' => "Help with cleaning dishes",
        ]);

        // user-update-task

        // AC1
        Task::factory()->for($user)->create([
            'subject' => "Help with groceries",
        ]);

        // AC2
        Task::factory()->for($user)->create([
            'subject' => "Help with glue",
        ]);
    }
}
