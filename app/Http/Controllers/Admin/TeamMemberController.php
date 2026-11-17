<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::with('reportsTo:id,name')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'category' => $member->category,
                'affiliation' => $member->affiliation,
                'institution' => $member->institution,
                'responsibilities' => $member->responsibilities,
                'position_rw' => $member->position_rw,
                'institution_rw' => $member->institution_rw,
                'responsibilities_rw' => $member->responsibilities_rw,
                'group_role_rw' => $member->group_role_rw,
                'reports_to_id' => $member->reports_to_id,
                'reports_to' => $member->reportsTo?->name,
                'group_number' => $member->group_number,
                'group_role' => $member->group_role,
                'photo' => $member->photo_url,
                'sort_order' => $member->sort_order,
                'is_active' => $member->is_active,
            ]);

        return Inertia::render('Admin/Team/Index', [
            'members' => $members,
            'categories' => [
                ['value' => 'leadership', 'label' => 'Leadership'],
                ['value' => 'support_team', 'label' => 'Support team'],
                ['value' => 'research_assistant', 'label' => 'Research assistants'],
                ['value' => 'psychologist', 'label' => 'Psychologists'],
                ['value' => 'community_health_worker', 'label' => 'Community health workers'],
                ['value' => 'other', 'label' => 'Other'],
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateMember($request);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')
                ->store('team-members', 'uploads');
        }

        TeamMember::create($validated);

        return back()->with('success', 'Team member added successfully.');
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $this->validateMember($request, $teamMember);

        if ($request->hasFile('photo')) {
            if ($teamMember->photo) {
                Storage::disk('uploads')->delete($teamMember->photo);
            }

            $validated['photo'] = $request->file('photo')
                ->store('team-members', 'uploads');
        }

        $teamMember->update($validated);

        return back()->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        DB::transaction(function () use ($teamMember) {
            // Avoid leaving members with an invalid reporting relationship.
            TeamMember::where('reports_to_id', $teamMember->id)
                ->update(['reports_to_id' => null]);

            if ($teamMember->photo) {
                Storage::disk('uploads')->delete($teamMember->photo);
            }

            $teamMember->delete();
        });

        return back()->with('success', 'Team member deleted successfully.');
    }

    private function validateMember(
        Request $request,
        ?TeamMember $teamMember = null
    ): array {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],

            'category' => [
                'required',
                Rule::in([
                    'leadership',
                    'support_team',
                    'research_assistant',
                    'psychologist',
                    'community_health_worker',
                    'other',
                ]),
            ],

            'affiliation' => [
                'required',
                Rule::in(['netherlands', 'rwanda', 'both']),
            ],

            'institution' => ['nullable', 'string', 'max:255'],
            'responsibilities' => ['nullable', 'string'],
            'position_rw' => ['nullable', 'string', 'max:255'],
            'institution_rw' => ['nullable', 'string', 'max:255'],
            'responsibilities_rw' => ['nullable', 'string'],

            'reports_to_id' => [
                'nullable',
                'integer',
                Rule::exists('team_members', 'id'),
                Rule::notIn([$teamMember?->id]),
            ],

            'group_number' => ['nullable', 'integer', 'min:1', 'max:100'],
            'group_role' => [
                'nullable',
                Rule::in(['psychologist', 'community_health_worker']),
            ],

            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);
    }
}