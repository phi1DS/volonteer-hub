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
            'user_id' => User::factory(),
            'subject' => $this->faker->sentence(4),
            'message' => $this->faker->paragraph(),
            'organisation' => $this->faker->sentence(4),
            'contact_information' => $this->faker->email(),
            'date_start' => $this->faker->dateTimeBetween('now', '+10 year'),
            'date_end' => $this->faker->dateTimeBetween('now', '+11 year'),
            'active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'active' => false,
        ]);
    }
}
