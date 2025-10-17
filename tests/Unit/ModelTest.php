<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_that_true_is_true()
    {
        /** @var Task $task */
        $task = Task::factory()->create();

        $task->subject = 'Subject Test';

        $this->assertSame('Subject Test', $task->subject);
    }
}
