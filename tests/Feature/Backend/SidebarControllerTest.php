<?php

declare(strict_types=1);

namespace Tests\Feature\Backend;

use App\Models\Task;
use App\Models\User;
use App\Models\VolunteerAnswer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SidebarControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_sidebar_counts(): void
    {
        // Arrange
        $user = User::factory()->create();

        // Active tasks for the user
        Task::factory()->for($user)->count(3)->create(['active' => true]);

        // Inactive tasks for the user
        Task::factory()->for($user)->count(2)->create(['active' => false]);

        // Volunteer answers for the user's tasks
        $task = Task::factory()->for($user)->create();
        VolunteerAnswer::factory()->for($task)->count(4)->create();

        // Another user's data (should not be counted)
        $otherUser = User::factory()->create();
        Task::factory()->for($otherUser)->create(['active' => true]);
        $otherTask = Task::factory()->for($otherUser)->create();
        VolunteerAnswer::factory()->for($otherTask)->create();

        // Act
        $response = $this->actingAs($user)->getJson(route('api.sidebar_counts'));

        // Assert
        $response->assertOk();
        $response->assertJson([
            'openedTasks' => 4, // 3 + 1 (the one with answers)
            'closedTasks' => 2,
            'volunteerAnswers' => 4,
        ]);
    }

    public function test_cannot_get_sidebar_counts_unauthenticated(): void
    {
        $response = $this->getJson(route('api.sidebar_counts'));

        $response->assertUnauthorized();
    }
}
