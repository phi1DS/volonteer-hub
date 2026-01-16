<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestCommand extends Command
{
    protected $signature = 'test:hello';

    protected $description = 'Test command';

    public function handle()
    {
        $this->info('It works!');
    }
}
