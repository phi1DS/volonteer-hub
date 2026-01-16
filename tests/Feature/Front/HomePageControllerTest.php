<?php

declare(strict_types=1);

namespace Tests\Feature\Backend;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_shows_only_active_and_future_tasks()
    {
        $user = User::factory()->create();

        // Past task -> should NOT appear
        Task::factory()->for($user)->create([
            'active' => true,
            'date_start' => now()->subDay(),
        ]);

        // Inactive task -> should NOT appear
        Task::factory()->for($user)->create([
            'active' => false,
            'date_start' => now()->addDay(),
        ]);

        // Valid task → should appear
        $valid = Task::factory()->for($user)->create([
            'active' => true,
            'date_start' => now()->addDay(),
        ]);

        $response = $this->get(route('homepage'));

        $response->assertOk();

        $tasks = $response->inertiaProps()['paginatedTasks']['data'];

        $this->assertCount(1, $tasks);
        $this->assertSame($valid->id, $tasks[0]['id']);
    }

    public function test_it_filters_by_text()
    {
        $user1 = User::factory()->create([
            'name' => 'user1',
        ]);

        $user2 = User::factory()->create([
            'name' => 'user2',
        ]);
        
        Task::factory()->for($user1)->create([
            'subject' => 'RedCross',
            'organisation' => 'RedCross',
            'active' => true,
            'date_start' => now()->addDay(),
        ]);

        $filtered = Task::factory()->for($user2)->create([
            'subject' => 'Green',
            'organisation' => 'GreenPeace',
            'active' => true,
            'date_start' => now()->addDay(),
        ]);

        $response = $this->get(route('homepage').'?textFilter=Green');

        $response->assertOk();

        $tasks = $response->inertiaProps()['paginatedTasks']['data'];

        $this->assertCount(1, $tasks);
        $this->assertSame($filtered->id, $tasks[0]['id']);
    }

    public function test_it_filters_by_date_range()
    {
        $user = User::factory()->create();

        // Outside range
        Task::factory()->for($user)->create([
            'active' => true,
            'date_start' => now()->addDays(10),
        ]);

        // Inside range
        $inside = Task::factory()->for($user)->create([
            'active' => true,
            'date_start' => now()->addDays(3),
        ]);

        $response = $this->get(route('homepage').'?'.http_build_query([
            'dateSearchStartFilter' => now()->addDay()->toDateString(),
            'dateSearchEndFilter' => now()->addDays(5)->toDateString(),
        ]));

        $tasks = $response->inertiaProps()['paginatedTasks']['data'];

        $this->assertCount(1, $tasks);
        $this->assertSame($inside->id, $tasks[0]['id']);
    }
}
