<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $members = TeamMember::query()
            ->where('is_active', true)
            ->with('reportsTo:id,name,position')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(function (TeamMember $member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'position' => $member->position,
                    'category' => $member->category,
                    'affiliation' => $member->affiliation,
                    'institution' => $member->institution,
                    'responsibilities' => $member->responsibilities,
                    'reports_to_id' => $member->reports_to_id,
                    'reports_to' => $member->reportsTo
                        ? [
                            'id' => $member->reportsTo->id,
                            'name' => $member->reportsTo->name,
                            'position' => $member->reportsTo->position,
                        ]
                        : null,
                    'group_number' => $member->group_number,
                    'group_role' => $member->group_role,
                    'position_rw' => $member->position_rw,
                    'institution_rw' => $member->institution_rw,
                    'responsibilities_rw' => $member->responsibilities_rw,
                    'group_role_rw' => $member->group_role_rw,
                    'photo_url' => $member->photo_url,
                    'sort_order' => $member->sort_order,
                ];
            })
            ->values();

        return Inertia::render('UserPage/Team/Index', [
            'members' => $members,
        ]);
    }
}