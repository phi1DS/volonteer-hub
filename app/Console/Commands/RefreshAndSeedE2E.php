<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RefreshAndSeedE2E extends Command
{
    protected $signature = 'app:refresh-and-seed';
    protected $description = 'Truncate all tables and run the specified seeder';

    public function handle(): int
    {
        $this->info('Truncating all tables...');

        // Check connection type
        $connection = DB::connection()->getDriverName();

        if ($connection === 'sqlite') {
            $tables = DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");

            DB::statement('PRAGMA foreign_keys = OFF;');
            foreach ($tables as $table) {
                DB::table($table->name)->truncate();
            }
            DB::statement('PRAGMA foreign_keys = ON;');
        }
        else {
            $this->info('Requires sqlite.');

            return 0;
        }

        $seeder = 'E2eDatabaseSeeder';
        $this->info("Seeding with $seeder...");
        $this->call('db:seed', ['--class' => $seeder]);

        $this->info('Done.');
        
        return 0;
    }
}
