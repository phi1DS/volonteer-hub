<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $task_id
 * @property string $message
 * @property string $name
 * @property \DateTime $created_at
 * @property \DateTime $updated_at
 */
class VolonteerAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'message',
        'name',
    ];

    protected $casts = [
        'task_id' => 'integer',
        'message' => 'string',
        'name' => 'string',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

