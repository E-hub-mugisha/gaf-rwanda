<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthContent extends Model
{
    protected $fillable = [
        'slug',
        'page_title',
        'content',
        'is_published',
    ];

    protected $casts = [
        'content' => 'array',
        'is_published' => 'boolean',
    ];
}