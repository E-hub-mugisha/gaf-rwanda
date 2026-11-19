<?php

namespace App\Models;

use App\Support\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class EventGallery extends Model
{
    protected $fillable = [
        'event_id',
        'title',
        'title_rw',
        'slug',
        'description',
        'description_rw',
        'cover_image',
        'is_public',
        'sort_order',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'cover_image_url',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function media()
    {
        return $this->hasMany(
            GalleryMedia::class,
            'event_gallery_id'
        )->orderBy('sort_order')->orderBy('id');
    }

    public function publicMedia()
    {
        return $this->hasMany(
            GalleryMedia::class,
            'event_gallery_id'
        )
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    public function scopePublic(Builder $query): Builder
    {
        return $query->where('is_public', true);
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        if (!$this->cover_image) {
            return null;
        }

        if (
            str_starts_with($this->cover_image, 'http://') ||
            str_starts_with($this->cover_image, 'https://')
        ) {
            return $this->cover_image;
        }

        return FileUpload::url($this->cover_image);
    }
}
