<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $subject
 * @property string $message
 * @property string|null $organisation
 * @property string|null $contact_information
 * @property \DateTime $date_start
 * @property \DateTime $date_end
 * @property bool $active
 * @property \DateTime $created_at
 * @property \DateTime $updated_at
 */
class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subject',
        'message',
        'organisation',
        'contact_information',
        'date_start',
        'date_end',
        'active',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'subject' => 'string',
        'message' => 'string',
        'organisation' => 'string',
        'contact_information' => 'string',
        'active' => 'boolean',
        'date_start' => 'datetime',
        'date_end' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'date_start' => 'datetime',
            'date_end' => 'datetime',
        ];
    }
}
