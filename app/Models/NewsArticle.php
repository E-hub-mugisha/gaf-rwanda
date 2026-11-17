<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class NewsArticle extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'news_category_id',
        'author_id',
        'title',
        'title_rw',
        'slug',
        'excerpt',
        'excerpt_rw',
        'content',
        'content_rw',
        'featured_image',
        'status',
        'is_featured',
        'published_at',
        'meta_title',
        'meta_title_rw',
        'meta_description',
        'meta_description_rw',
        'views_count',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'views_count' => 'integer',
    ];

    protected $appends = [
        'featured_image_url',
    ];

    public function category()
    {
        return $this->belongsTo(
            NewsCategory::class,
            'news_category_id'
        );
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeLatestPublished(Builder $query): Builder
    {
        return $query
            ->published()
            ->orderByDesc('published_at');
    }

    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (!$this->featured_image) {
            return null;
        }

        if (
            str_starts_with($this->featured_image, 'http://') ||
            str_starts_with($this->featured_image, 'https://')
        ) {
            return $this->featured_image;
        }

        return Storage::disk('uploads')->url($this->featured_image);
    }
}
