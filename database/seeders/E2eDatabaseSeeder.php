<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class E2eDatabaseSeeder extends Seeder
{
    const string e2eUserEmail = 'e2eUser@test.com';

    /**
     * Run the database e2e seeds.
     * 
     * Creates the data used to run e2e tests
     * 
     * (should be converted into test specific CRUD apis if becomes to big)
     * 
     * command to setup e2e DB (with migrations): php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder
     * command to setup e2e DB: php artisan app:testing:refresh-and-seed
     */
    public function run(): void
    {
        // Basic seeding

        // Creates e2eUser as default user to login for backoffice tests

        $userName = 'e2eUser';
        $userEmail = self::e2eUserEmail;
        User::factory()->create([
            'name' => $userName,
            'email' => $userEmail,
            'password' => 'testpassword',
        ]);
    }
}
