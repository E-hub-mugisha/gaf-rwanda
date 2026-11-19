<?php

namespace Database\Seeders;

use App\Support\FileUpload;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamMemberSeeder extends Seeder
{
    /** @var array<string, TeamMember> */
    private array $people = [];

    /** child key => parent key */
    private array $reports = [];

    private int $photos = 0;

    public function run(): void
    {
        $this->leadership();
        $this->supportTeam();
        $this->researchAssistants();
        $this->assessmentPsychologists();
        $this->interventionGroups();
        $this->linkReportingLines();

        $this->command?->info(sprintf(
            'Team seeded: %d members, %d photos attached.',
            count($this->people),
            $this->photos
        ));
    }

    /* ------------------------------------------------------------------
     | Leadership
     |------------------------------------------------------------------ */

    private function leadership(): void
    {
        $this->add('claudi', [
            'name' => 'Prof. Claudi',
            'position' => 'Main supervisor (PI)',
            'position_rw' => 'Umuyobozi mukuru w’ubushakashatsi (PI)',
            'category' => 'leadership',
            'affiliation' => 'netherlands',
            'institution' => 'Amsterdam UMC',
            'institution_rw' => 'Amsterdam UMC',
            'sort_order' => 1,
        ]);

        $this->add('evi-anne', [
            'name' => 'Dr. Evi-Anne',
            'position' => 'Co-supervisor',
            'position_rw' => 'Umwungirije mu kugenzura ubushakashatsi',
            'category' => 'leadership',
            'affiliation' => 'netherlands',
            'institution' => 'Amsterdam UMC',
            'institution_rw' => 'Amsterdam UMC',
            'sort_order' => 2,
        ]);

        $this->add('darius', [
            'name' => 'Dr. Darius',
            'position' => 'Supervisor',
            'position_rw' => 'Umugenzuzi w’ubushakashatsi',
            'category' => 'leadership',
            'affiliation' => 'rwanda',
            'institution' => 'RBC Mental Health Division',
            'institution_rw' => 'Ishami ry’Ubuzima bwo mu Mutwe muri RBC',
            'sort_order' => 3,
        ]);

        $this->add('theogene', [
            'name' => 'Theogene',
            'position' => 'PhD candidate · trial lead',
            'position_rw' => 'Umunyeshuri uri gukora impamyabumenyi y’ikirenga (PhD) · Umuyobozi w’igerageza ry’ubushakashatsi',
            'category' => 'leadership',
            'affiliation' => 'both',
            'institution' => 'Amsterdam UMC & Rwanda',
            'institution_rw' => 'Amsterdam UMC n’u Rwanda',
            'sort_order' => 4,
        ], reportsTo: 'claudi');
    }

    /* ------------------------------------------------------------------
     | Support team
     |------------------------------------------------------------------ */

    private function supportTeam(): void
    {
        $this->add('agnes', [
            'name' => 'Agnes',
            'position' => 'PhD candidate (GAF Indonesia) · technical support',
            'position_rw' => 'Umunyeshuri uri gukora impamyabumenyi y’ikirenga (PhD) muri GAF Indonesia · Ubufasha mu bya tekiniki',
            'category' => 'support_team',
            'affiliation' => 'netherlands',
            'sort_order' => 10,
        ]);

        $this->add('anne-marie', [
            'name' => 'Anne Marie',
            'position' => 'RBC support team',
            'position_rw' => 'Itsinda ry’ubufasha rya RBC',
            'category' => 'support_team',
            'affiliation' => 'rwanda',
            'responsibilities' => 'Suicide risk & referral; coordinates CHWs & psychologists.',
            'responsibilities_rw' => 'Gukurikirana ibyago byo kwiyahura no kohereza abantu ku nzego zibishinzwe; guhuza ibikorwa by’abajyanama b’ubuzima n’inzobere mu buzima bwo mu mutwe.',
            'sort_order' => 11,
        ]);

        $this->add('jeanne-darc', [
            'name' => "Jeanne D'Arc",
            'position' => 'RBC support team',
            'position_rw' => 'Itsinda ry’ubufasha rya RBC',
            'category' => 'support_team',
            'affiliation' => 'rwanda',
            'responsibilities' => 'Supports blinded RAs: recruits & manages SCID psychologists.',
            'responsibilities_rw' => 'Afasha abafasha mu bushakashatsi batamenyeshejwe itsinda ry’igerageza abitabira ubushakashatsi, kandi agahuza inzobere zikora isuzuma rya SCID.',
            'sort_order' => 12,
        ]);

        $this->add('chrysostome', [
            'name' => 'Chrysostome',
            'position' => 'RBC support team',
            'position_rw' => 'Itsinda ry’ubufasha rya RBC',
            'category' => 'support_team',
            'affiliation' => 'rwanda',
            'responsibilities' => 'Supports the unblinded RA with randomization.',
            'responsibilities_rw' => 'Afasha umufasha mu bushakashatsi uzi uko abitabiriye bashyirwa mu matsinda, mu bikorwa byo kubashyira mu matsinda mu buryo bw’amahirwe.',
            'sort_order' => 13,
        ]);
    }

    /* ------------------------------------------------------------------
     | Research assistants
     |------------------------------------------------------------------ */

    private function researchAssistants(): void
    {
        $this->add('cedrick', [
            'name' => 'Cedrick',
            'position' => 'Blinded RA · outcome assessments',
            'position_rw' => 'Umufasha mu bushakashatsi utazi itsinda ry’igerageza · Isuzuma ry’ibyagezweho',
            'category' => 'research_assistant',
            'affiliation' => 'rwanda',
            'responsibilities' => "With Jeanne D'Arc (RBC)",
            'responsibilities_rw' => "Akora afatanyije na Jeanne D'Arc (RBC)",
            'sort_order' => 20,
        ], reportsTo: 'theogene');

        $this->add('nicole', [
            'name' => 'Nicole',
            'position' => 'Blinded RA · outcome assessments',
            'position_rw' => 'Umufasha mu bushakashatsi utazi itsinda ry’igerageza · Isuzuma ry’ibyagezweho',
            'category' => 'research_assistant',
            'affiliation' => 'rwanda',
            'responsibilities' => "With Jeanne D'Arc (RBC)",
            'responsibilities_rw' => "Akora afatanyije na Jeanne D'Arc (RBC)",
            'sort_order' => 21,
        ], reportsTo: 'theogene');

        $this->add('esther', [
            'name' => 'Esther',
            'position' => 'Unblinded RA · intervention',
            'position_rw' => 'Umufasha mu bushakashatsi uzi itsinda ry’igerageza · Ibikorwa byo gutanga ubufasha',
            'category' => 'research_assistant',
            'affiliation' => 'rwanda',
            'responsibilities' => 'With Chrysostome (randomization) & Anne Marie (coordination, safety)',
            'responsibilities_rw' => 'Akora afatanyije na Chrysostome mu gushyira abitabiriye mu matsinda, na Anne Marie mu guhuza ibikorwa no gukurikirana umutekano w’abitabiriye.',
            'sort_order' => 22,
        ], reportsTo: 'theogene');
    }

    /* ------------------------------------------------------------------
     | Assessment psychologists
     |------------------------------------------------------------------ */

    private function assessmentPsychologists(): void
    {
        $names = [
            'Edisa',
            'Jullienne',
            'Claudine',
            'Brigitte',
            'Eugenie',
            'Alice U.',
            'Odille',
            'Alice T.',
            'Claire',
            'Cesarie',
            'Valerie',
            'Claudette',
            'Ariane',
            'Samuel',
            'Chance',
            'Valentine',
            'Olive',
            'Grace',
        ];

        foreach ($names as $i => $name) {
            $this->add('assessor-' . ($i + 1), [
                'name' => $name,
                'position' => 'Psychologist · SCID-5 interviews',
                'position_rw' => 'Inzobere mu buzima bwo mu mutwe · Ibazwa rishingiye ku buryo bwa SCID-5',
                'category' => 'psychologist',
                'affiliation' => 'rwanda',
                'responsibilities' => 'Blinded diagnostic assessment',
                'responsibilities_rw' => 'Gusuzuma ubuzima bwo mu mutwe hatamenyekanye itsinda umuntu arimo mu igerageza.',
                'sort_order' => 100 + $i,
            ], reportsTo: 'jeanne-darc');
        }
    }

    /* ------------------------------------------------------------------
     | Intervention groups
     |------------------------------------------------------------------ */

    private function interventionGroups(): void
    {
        $groups = [
            1  => ['Umulisa',      ['Dorothee', 'Joline']],
            2  => ['Hilarie',      ['Console', 'Liliane']],
            3  => ['Marie Claire', ['Prosper', 'Henriette']],
            4  => ['M. Francoise', ['Vestine', 'Christine']],
            5  => ['Albertine',    ['Jacqueline', 'Natasha']],
            6  => ['Pascal',       ['Marie Rose', 'Emmanuel']],
            7  => ['Donatha',      ['Innocent', 'Alphonsine']],
            8  => ['Jeanne',       ['Jean de Dieu', 'Francoise']],
            9  => ['Annonciata',   ['Leonie', 'Beatrice']],
            10 => ['Placide',      ['Leah', 'Clarisse']],
            11 => ['Christelle',   ['Marcelline', 'Beatrice']],
            12 => ['Eugenie',      ['Veneranda', 'Mohammed']],
            13 => ['Francoise',    ['Anthel', 'Theophile']],
            14 => ['Athanase',     ['Soline', 'Damascene']],
            15 => ['Solange',      ['Alphonse', 'Philomene']],
        ];

        foreach ($groups as $number => [$lead, $chws]) {
            $base = 200 + ($number * 10);
            $leadKey = "g{$number}-lead";

            $this->add($leadKey, [
                'name' => $lead,
                'position' => 'Psychologist · group lead',
                'position_rw' => 'Inzobere mu buzima bwo mu mutwe · Umuyobozi w’itsinda',
                'category' => 'psychologist',
                'affiliation' => 'rwanda',
                'group_number' => $number,
                'group_role' => 'psychologist',
                'group_role_rw' => 'Inzobere mu buzima bwo mu mutwe',
                'sort_order' => $base,
            ], reportsTo: 'esther');

            foreach ($chws as $i => $chw) {
                $this->add("g{$number}-chw" . ($i + 1), [
                    'name' => $chw,
                    'position' => 'Community health worker',
                    'position_rw' => 'Umujyanama w’ubuzima',
                    'category' => 'community_health_worker',
                    'affiliation' => 'rwanda',
                    'group_number' => $number,
                    'group_role' => 'community_health_worker',
                    'group_role_rw' => 'Umujyanama w’ubuzima',
                    'sort_order' => $base + $i + 1,
                ], reportsTo: $leadKey);
            }
        }
    }

    /* ------------------------------------------------------------------
     | Helpers
     |------------------------------------------------------------------ */

    /**
     * Creates a member if one does not exist.
     *
     * Existing records are not overwritten. This protects changes made
     * through the admin panel when the seeder is run again.
     */
    private function add(
        string $key,
        array $attributes,
        ?string $reportsTo = null
    ): void {
        $attributes += [
            'institution' => null,
            'institution_rw' => null,
            'responsibilities' => null,
            'responsibilities_rw' => null,
            'position_rw' => null,
            'group_role' => null,
            'group_role_rw' => null,
            'group_number' => null,
            'is_active' => true,
        ];

        $member = TeamMember::firstOrCreate(
            [
                'name' => $attributes['name'],
                'category' => $attributes['category'],
                'group_number' => $attributes['group_number'],
            ],
            $attributes
        );

        // Attach a photo if one exists in public/uploads/team.
        if (
            ! $member->photo &&
            ($photo = $this->findPhoto(
                $attributes['name'],
                $attributes['group_number']
            ))
        ) {
            $member->update(['photo' => $photo]);
            $this->photos++;
        }

        $this->people[$key] = $member;

        if ($reportsTo) {
            $this->reports[$key] = $reportsTo;
        }
    }

    /**
     * Photo naming:
     * Without group: {slug}.jpg
     * With group:    {slug}-g{group}.jpg
     *
     * Extensions: jpg, jpeg, png, webp.
     */
    private function findPhoto(string $name, ?int $group): ?string
    {
        $slug = Str::slug($name) . ($group ? "-g{$group}" : '');

        foreach (['jpg', 'jpeg', 'png', 'webp'] as $extension) {
            $path = "team/{$slug}.{$extension}";

            if (FileUpload::exists($path)) {
                return $path;
            }
        }

        return null;
    }

    /**
     * Link team members to their reporting supervisors.
     */
    private function linkReportingLines(): void
    {
        foreach ($this->reports as $childKey => $parentKey) {
            $child = $this->people[$childKey] ?? null;
            $parent = $this->people[$parentKey] ?? null;

            if ($child && $parent && $child->reports_to_id === null) {
                $child->update([
                    'reports_to_id' => $parent->id,
                ]);
            }
        }
    }
}
