<?php

declare(strict_types=1);

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_reopen_task(): void
    {
        // Arrange
        $loggedUser = User::factory()->create();
        /** @var Task $task */
        $task = Task::factory()->create(['user_id' => $loggedUser->id]);

        // Act
        $response = $this->actingAs($loggedUser)->post(route('tasks.task_reopen', $task));

        // Assert
        $response->assertRedirect(route('tasks.task_inactive'));
        $response->assertSessionHas('type', 'success');

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
            'message' => fake()->paragraph(),
            'organisation' => fake()->sentence(2),
            'contact_information' => fake()->sentence(2),
            'date_start' => now(),
            'date_end' => now()->addDay(),
        ];

        /** @var Task $task */
        $task = Task::factory()->create($taskProperties);

        $payload = [
            ...$taskProperties,
            'subject' => 'New Subject'
        ];
        unset($payload['user_id']);

        // Act
        $response = $this->actingAs($user)->put(route('tasks.task_update', $task), $payload);

        // Assert
        $response->assertRedirect(route('dashboard'));

        $response->assertSessionHas([
            'type' => 'success',
            'message' => 'Task updated',
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
            'subject' => fake()->sentence(2),
            'message' => fake()->paragraph(),
            'organisation' => fake()->sentence(2),
            'contact_information' => fake()->sentence(2),
            'date_start' => now(),
            'date_end' => now()->addDay(),
        ];

        // Act
        $response = $this->actingAs($user)->put(route('tasks.task_update', $task), $payload);

        // Assert
        $response->assertRedirect(route('unauthorized'));

        $task->refresh();
        $this->assertNotEquals('Should Not Update', $task->title);
    }
}
