<?php

declare(strict_types=1);

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_show_in_active_tasks_for_user()
    {
        // Arrange
        $user = User::factory()->create();

        Task::factory()->count(3)->create([
            'user_id' => $user->id,
            'active' => false,
        ]);

        Task::factory()->count(5)->create([
            'user_id' => $user->id,
            'active' => true,
        ]);

        // Act
        $response = $this->actingAs($user)->get(route('tasks.task_inactive'));

        // Assert
        $response->assertStatus(200);

        $this->assertSame(3, count($response->inertiaProps()['paginatedInactiveTasks']['data']));
    }

    public function test_can_reopen_task(): void
    {
        // Arrange
        $loggedUser = User::factory()->create();
        /** @var Task $task */
        $task = Task::factory()->create(['user_id' => $loggedUser->id, 'active' => false]);

        // Act
        $response = $this->actingAs($loggedUser)->post(route('tasks.task_reopen', $task));

        // Assert
        $response->assertSessionHas(['type' => 'success']);

        $task->refresh();
        $this->assertTrue($task->active === true);
    }

    public function test_user_can_update_own_task()
    {
        // Arrange
        $user = User::factory()->create();

        $taskProperties = [
            'user_id' => $user->id,
            'subject' => 'Old Subject',
            'message' => $this->faker->paragraph(),
            'organisation' => $this->faker->sentence(2),
            'contact_information' => $this->faker->sentence(2),
            'date_start' => now(),
            'date_end' => now()->addDay(),
        ];

        /** @var Task $task */
        $task = Task::factory()->create($taskProperties);

        $payload = [
            ...$taskProperties,
            'subject' => 'New Subject',
        ];
        unset($payload['user_id']);

        // Act
        $response = $this->actingAs($user)->put(route('tasks.task_update', $task), $payload);

        // Assert
        $response->assertSessionHas([
            'type' => 'success',
        ]);

        $task->refresh();
        $this->assertEquals('New Subject', $task->subject);
    }

    public function test_user_cannot_update_someone_elses_task()
    {
        // Arrange
        $user = User::factory()->create();

        /** @var Task $task */
        $task = Task::factory()->create();

        $payload = [
            'subject' => $this->faker->sentence(2),
            'message' => $this->faker->paragraph(),
            'organisation' => $this->faker->sentence(2),
            'contact_information' => $this->faker->sentence(2),
            'date_start' => now(),
            'date_end' => now()->addDay(),
        ];

        // Act
        $response = $this->actingAs($user)->put(route('tasks.task_update', $task), $payload);

        // Assert
        $response->assertForbidden();

        $task->refresh();
        $this->assertNotEquals('Should Not Update', $task->subject);
    }
}
