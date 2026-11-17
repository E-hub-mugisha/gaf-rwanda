<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GalleryMedia extends Model
{
    protected $table = 'gallery_media';

    protected $fillable = [
        'event_gallery_id',
        'type',
        'disk',
        'file_path',
        'original_name',
        'mime_type',
        'file_size',
        'external_url',
        'alt_text',
        'alt_text_rw',
        'caption',
        'caption_rw',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'file_size' => 'integer',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'media_url',
    ];

    public function gallery()
    {
        return $this->belongsTo(
            EventGallery::class,
            'event_gallery_id'
        );
    }

    public function getMediaUrlAttribute(): ?string
    {
        if ($this->external_url) {
            return $this->external_url;
        }

        if (!$this->file_path) {
            return null;
        }

        return Storage::disk($this->disk ?: 'uploads')
            ->url($this->file_path);
    }

    public function getIsVideoAttribute(): bool
    {
        return $this->type === 'video';
    }
}
