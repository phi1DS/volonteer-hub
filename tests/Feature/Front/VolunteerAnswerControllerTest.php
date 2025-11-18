<?php

namespace Tests\Feature\Auth;

use App\Models\Task;
use App\Models\VolunteerAnswer;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VolunteerAnswerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_store(): void
    {
        // Arrange

        $task = Task::factory()->create();

        $volunteerAnswerData = [
            'task_id' => $task->id,
            'message' => fake()->paragraph(),
            'name' => fake()->sentence(2),
        ];

        // Act

        $response = $this->post(route('volunteer_answer.store') , $volunteerAnswerData);
        $response->assertStatus(200);

        // Assert

        $this->assertTrue(isset($response['message']));
        $this->assertSame('Answer submitted successfully', $response['message']);

        $volunteerAnswer = VolunteerAnswer::query()->where('task_id', $task->id)->first();
        $this->assertTrue(isset($volunteerAnswer));
    }
}