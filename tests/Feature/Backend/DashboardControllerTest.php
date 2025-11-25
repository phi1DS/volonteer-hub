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

        // unrelated
        Task::factory()->for($user)->count(2)->inactive()->create();

        // related
        $tasks = Task::factory()->for($user)->count(3)->create();

        // Act
        $response = $this->actingAs($user)->get(route('dashboard'));
        $paginatedTasksData = $response->inertiaProps()['paginatedTasks']['data'];

        // Assert
        $response->assertOk();
        $this->assertSame($tasks[0]->id, $paginatedTasksData[0]['id']);
        $this->assertSame($tasks[1]->id, $paginatedTasksData[1]['id']);
        $this->assertSame($tasks[2]->id, $paginatedTasksData[2]['id']);
    }
}
