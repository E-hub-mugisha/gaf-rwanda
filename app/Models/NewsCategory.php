<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class NewsCategory extends Model
{
    protected $fillable = [
        'name',
        'name_rw',
        'slug',
        'description',
        'is_active',
        'sort_order',
    ];

    public function articles()
    {
        return $this->hasMany(
            NewsArticle::class,
            'news_category_id'
        );
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
