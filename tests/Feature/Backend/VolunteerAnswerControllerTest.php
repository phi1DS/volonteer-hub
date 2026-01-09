<?php

declare(strict_types=1);

namespace Tests\Feature\Backend;

use App\Models\Task;
use App\Models\User;
use App\Models\VolunteerAnswer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VolunteerAnswerControllerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_list(): void {
        // Arrange
        // unrelated task
        $unrelatedTask = Task::factory()->for($this->user)->create([
            'subject' => 'unrelated',
        ]);
        VolunteerAnswer::factory()->for($unrelatedTask)->count(2)->create();

        // related task
        $filterPrefix = 'taskfiltered';
        $task = Task::factory()->for($this->user)->create([
            'subject' => $filterPrefix,
        ]);
        $volunteerAnswers = VolunteerAnswer::factory()->for($task)->count(3)->create();

        // Act
        $response = $this->actingAs($this->user)
            ->get(route('volunteer_answer_backend.volunteer_answer_list') . '?task=' . $filterPrefix);

        $volunteerAnswersData = $response->inertiaProps()['paginatedVolunteerAnswers']['data'];

        // Assert
        $response->assertOk();
        $this->assertSame(3, count($volunteerAnswersData));
        $this->assertSame($volunteerAnswers[0]->id, $volunteerAnswersData[0]['id']);
        $this->assertSame($volunteerAnswers[1]->id, $volunteerAnswersData[1]['id']);
        $this->assertSame($volunteerAnswers[2]->id, $volunteerAnswersData[2]['id']);
    }

    public function test_can_show_and_filter(): void {
        // Arrange
        // unrelated
        VolunteerAnswer::factory()->create();

        // related
        $volunteerAnswer = VolunteerAnswer::factory()->for(
            Task::factory()->for($this->user), 'task'
        )->create();

        // Act
        $response = $this->actingAs($this->user)
            ->get(route('volunteer_answer_backend.volunteer_answer_show', ['volunteerAnswer' => $volunteerAnswer]));
        $volunteerAnswerData = $response->inertiaProps()['volunteerAnswer'];

        // Assert
        $response->assertOk();
        $this->assertSame($volunteerAnswer->id, $volunteerAnswerData['id']);
    }

    public function test_can_delete(): void {
        // Arrange
        // unrelated
        VolunteerAnswer::factory()->create();

        // related
        $volunteerAnswer = VolunteerAnswer::factory()->for(
            Task::factory()->for($this->user), 'task'
        )->create();

        // Act
        $response = $this->actingAs($this->user)
            ->delete(route('volunteer_answer_backend.volunteer_answer_delete', ['volunteerAnswer' => $volunteerAnswer]));

        // Assert
        $response->assertFound();
        $this->assertSame(1, count(VolunteerAnswer::query()->get()));
        $this->assertNull(VolunteerAnswer::query()->where('id', $volunteerAnswer->id)->first());
    }

    public function test_can_update_notes(): void {
        // Arrange
        $volunteerAnswer = VolunteerAnswer::factory()->for(
            Task::factory()->for($this->user), 'task'
        )->create(['notes' => 'old notes']);

        // Act
        $response = $this->actingAs($this->user)
            ->patch(route('volunteer_answer_backend.volunteer_answer_update', ['volunteerAnswer' => $volunteerAnswer]), [
                'notes' => 'new notes',
            ]);

        // Assert
        $response->assertFound();
        $this->assertSame('new notes', $volunteerAnswer->refresh()->notes);
    }

    public function test_cannot_update_notes_of_unauthorized_answer(): void {
        // Arrange
        $otherUser = User::factory()->create();
        $volunteerAnswer = VolunteerAnswer::factory()->for(
            Task::factory()->for($otherUser), 'task'
        )->create(['notes' => 'old notes']);

        // Act
        $response = $this->actingAs($this->user)
            ->patch(route('volunteer_answer_backend.volunteer_answer_update', ['volunteerAnswer' => $volunteerAnswer]), [
                'notes' => 'new notes',
            ]);

        // Assert
        $response->assertRedirect(route('unauthorized'));
        $this->assertSame('old notes', $volunteerAnswer->refresh()->notes);
    }
}
