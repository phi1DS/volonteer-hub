<?php

namespace App\Console\Commands;

use Database\Seeders\E2eDatabaseSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PruneDatabaseE2E extends Command
{
    protected $signature = 'app:testing:prune-db';

    protected $description = 'Truncate all tables except default e2e user and sessions table';

    // exclude e2e user and session to keep them alive between tests and save time

    public function handle(): int
    {
        $this->info('Pruning all tables except default e2e user and sessions');

        // Check connection type
        $connection = DB::connection()->getDriverName();
        if ($connection !== 'sqlite') {
            $this->info('Requires sqlite.');

            return 0;
        }

        $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");

        DB::statement('PRAGMA foreign_keys = OFF;');

        foreach ($tables as $table) {
            $tableName = $table->name;

            if ($tableName === 'sessions') { // -> to improve at some point to only delete non seeded e2e user session
                continue;
            }

            if ($tableName === 'users') {
                $e2eUserEmail = E2eDatabaseSeeder::e2eUserEmail;
                DB::table('users')
                    ->where('email', '<>', $e2eUserEmail)
                    ->delete();

                continue;
            }

            DB::table($tableName)->truncate();
        }

        DB::statement('PRAGMA foreign_keys = ON;');

        $this->info('DB pruned successfully.');

        return 0;
    }
}
