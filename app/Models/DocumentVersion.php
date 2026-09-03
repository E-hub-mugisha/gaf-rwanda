<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentVersion extends Model
{
    protected $fillable = [
        'document_id',
        'language',
        'file_path',
        'original_filename',
        'file_size',
    ];

    public const LANGUAGES = [
        'en' => 'English',
        'es' => 'Spanish',
        'rw' => 'Kinyarwanda',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function languageLabel(): string
    {
        return self::LANGUAGES[$this->language] ?? $this->language;
    }
}
