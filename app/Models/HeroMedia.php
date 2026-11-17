<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class HeroMedia extends Model
{
    protected $table = 'hero_media';

    protected $fillable = [
        'title',
        'youtube_url',
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
            ? Storage::disk('uploads')->url($this->banner_image)
            : null;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->orderBy('sort_order')
            ->latest('id');
    }
}