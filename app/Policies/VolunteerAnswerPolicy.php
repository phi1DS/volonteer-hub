<?php

namespace App\Policies;

use App\Models\User;
use App\Models\VolunteerAnswer;

class VolunteerAnswerPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, VolunteerAnswer $volunteerAnswer): bool
    {
        $volunteerAnswer->loadMissing('task');

        return $volunteerAnswer->task && $user->id === $volunteerAnswer->task->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, VolunteerAnswer $volunteerAnswer): bool
    {
        $volunteerAnswer->loadMissing('task');

        return $volunteerAnswer->task && $user->id === $volunteerAnswer->task->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, VolunteerAnswer $volunteerAnswer): bool
    {
        $volunteerAnswer->loadMissing('task');

        return $volunteerAnswer->task && $user->id === $volunteerAnswer->task->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, VolunteerAnswer $volunteerAnswer): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, VolunteerAnswer $volunteerAnswer): bool
    {
        return false;
    }
}
