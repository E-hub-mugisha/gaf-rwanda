<?php

namespace App\Models;

use App\Support\FileUpload;
use Illuminate\Database\Eloquent\Model;

class HeroMedia extends Model
{
    protected $table = 'hero_media';

    protected $fillable = [
        'title',
        'vimeo_url',
        'video_thumbnail',
        'banner_image',
        'alt_text',
        'caption',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function getBannerImageUrlAttribute(): ?string
    {
        return $this->banner_image
            ? FileUpload::url($this->banner_image)
            : null;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->orderBy('sort_order')
            ->latest('id');
    }
}