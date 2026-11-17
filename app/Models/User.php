<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
        'role',       // 'admin' | 'user' | 'editor'
        'created_by', // id of the admin who created this account (null for the admin themself)
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function createdUsers()
    {
        return $this->hasMany(User::class, 'created_by');
    }

    public function documentsUploaded()
    {
        return $this->hasMany(Document::class, 'created_by');
    }

    public function isEditor(): bool
    {
        return $this->role === 'editor';
    }

    public function canAccessAdmin(): bool
    {
        return $this->is_active &&
            in_array($this->role, ['admin', 'editor'], true);
    }

    public function createdEvents(): HasMany
    {
        return $this->hasMany(Event::class, 'created_by');
    }

    public function newsArticles(): HasMany
    {
        return $this->hasMany(NewsArticle::class, 'author_id');
    }
}
