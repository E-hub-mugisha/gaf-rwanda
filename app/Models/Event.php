<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'event_category_id',
        'program_id',
        'created_by',

        'title',
        'title_rw',

        'slug',

        'excerpt',
        'excerpt_rw',

        'description',
        'description_rw',

        'cover_image',

        'venue',
        'venue_rw',

        'address',
        'address_rw',

        'city',
        'city_rw',

        'country',

        'starts_at',
        'ends_at',
        'timezone',

        'status',
        'is_featured',
        'registration_url',

        'agenda',
        'agenda_rw',

        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'published_at' => 'datetime',
            'is_featured' => 'boolean',
            'agenda' => 'array',
            'agenda_rw' => 'array',
        ];
    }

    protected $appends = [
        'cover_image_url',
        'timing',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(EventGallery::class)
            ->orderBy('sort_order');
    }

    public function newsArticles(): BelongsToMany
    {
        return $this->belongsToMany(
            NewsArticle::class,
            'event_news',
            'event_id',
            'news_article_id'
        )->withTimestamps();
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->where(function ($query) {
                $query->whereNull('published_at')
                    ->orWhere('published_at', '<=', now());
            });
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->published()
            ->where('starts_at', '>', now());
    }

    public function scopeOngoing(Builder $query): Builder
    {
        return $query->published()
            ->where('starts_at', '<=', now())
            ->whereNotNull('ends_at')
            ->where('ends_at', '>=', now());
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->published()
            ->where(function ($query) {
                $query->where('ends_at', '<', now())
                    ->orWhere(function ($query) {
                        $query->whereNull('ends_at')
                            ->where('starts_at', '<', now());
                    });
            });
    }

    public function getTimingAttribute(): string
    {
        if ($this->status === 'cancelled') {
            return 'cancelled';
        }

        if ($this->starts_at && $this->starts_at->isFuture()) {
            return 'upcoming';
        }

        if ($this->ends_at && $this->ends_at->isFuture()) {
            return 'ongoing';
        }

        return 'past';
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        if (! $this->cover_image) {
            return null;
        }

        if (
            str_starts_with($this->cover_image, 'http://') ||
            str_starts_with($this->cover_image, 'https://')
        ) {
            return $this->cover_image;
        }

        return \App\Support\FileUpload::url($this->cover_image);
    }
}
