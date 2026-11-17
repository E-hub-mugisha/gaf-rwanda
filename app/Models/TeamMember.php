<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'position',
        'category',
        'affiliation',
        'institution',
        'responsibilities',
        'reports_to_id',
        'group_number',
        'group_role',
        'photo',
        'sort_order',
        'is_active',
        'position_rw',
        'institution_rw',
        'responsibilities_rw',
        'group_role_rw',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'group_number' => 'integer',
    ];

    public function reportsTo()
    {
        return $this->belongsTo(TeamMember::class, 'reports_to_id');
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamMember::class, 'reports_to_id');
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo
            ? Storage::disk('uploads')->url($this->photo)
            : null;
    }
}
