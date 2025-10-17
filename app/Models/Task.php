<?php
declare(strict_types=1);

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public int $user_id;
    public string $subject;
    public string $message;
    public string $organisation;
    public string $contact_information;
    public DateTime $date_start;
    public DateTime $date_end;
    public bool $active;

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

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
