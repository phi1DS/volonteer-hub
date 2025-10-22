<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'subject' => fake()->sentence(4),
            'message' => fake()->paragraph(),
            'organisation' => fake()->sentence(4),
            'contact_information' => fake()->sentence(4),
            'date_start' => fake()->dateTimeBetween('now', '+1 week'),
            'date_end' => fake()->dateTimeBetween('now', '+2 week'),
            'active' => true,
        ];
    }
}
