<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'title',
        'description',
        'created_by',
    ];

    public function versions()
    {
        return $this->hasMany(DocumentVersion::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function versionFor(string $language): ?DocumentVersion
    {
        return $this->versions->firstWhere('language', $language);
    }

    public function availableLanguages(): array
    {
        return $this->versions->pluck('language')->all();
    }
}
