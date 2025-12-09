<?php

declare(strict_types=1);

namespace Tests\Feature\Backend;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_show_dashboard(): void {
        // Arrange
        $user = User::factory()->create();
        Task::factory()->for($user)->count(2)->inactive()->create(); // Unrelated inactive tasks
        $tasks = Task::factory()->for($user)->count(3)->create(); // Related active tasks

        // Act
        $response = $this->actingAs($user)->get(route('dashboard'));
        $paginatedTasksData = $response->inertiaProps()['paginatedTasks']['data'];

        // Assert
        $response->assertOk();
        $this->assertSame(3, count($paginatedTasksData));
        foreach ($paginatedTasksData as $task) {
            $this->assertTrue($task['active'], "Task {$task['id']} is not active");
        }
    }
}
