<?php

namespace Tests\Feature\Front;

use App\Models\Task;
use App\Models\VolunteerAnswer;
use App\Services\CaptchaService;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;

class VolunteerAnswerControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_can_store(): void
    {
        // Arrange
        $captchaToken = 'token';
        $captchaMock = Mockery::mock(CaptchaService::class);
        $this->app->instance(CaptchaService::class, $captchaMock);
        
        $captchaMock->shouldReceive('isCaptchaTokenValid')
            ->once()
            ->with($captchaToken)
            ->andReturn(true);

        $task = Task::factory()->create();

        $volunteerAnswerData = [
            'task_id' => $task->id,
            'message' => $this->faker->paragraph(),
            'name' => $this->faker->sentence(2),
            'captcha_token' => $captchaToken
        ];

        // Act
        $response = $this->post(route('volunteer_answer.store') , $volunteerAnswerData);
        $response->assertFound();

        // Assert
        $volunteerAnswer = VolunteerAnswer::query()->where('task_id', $task->id)->first();
        $this->assertTrue(isset($volunteerAnswer));
    }
}