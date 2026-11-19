<?php

namespace Database\Seeders;

use App\Models\HeroMedia;
use App\Support\Vimeo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Test data for the homepage hero video (Vimeo).
 *
 *   php artisan db:seed --class=HeroMediaSeeder
 *
 * Not called from DatabaseSeeder on purpose, so production is not filled
 * with a sample video. Replace the link from Admin > Hero Media.
 */
class HeroMediaSeeder extends Seeder
{
    public function run(): void
    {
        // Public sample video from Vimeo's own player documentation.
        $url = 'https://vimeo.com/76979871';

        DB::transaction(function () use ($url) {
            HeroMedia::query()->update(['is_active' => false]);

            HeroMedia::updateOrCreate(
                ['vimeo_url' => $url],
                [
                    'title' => 'GAF-Rwanda hero video (test)',
                    'video_thumbnail' => Vimeo::thumbnail($url),
                    'alt_text' => 'GAF-Rwanda study introduction video',
                    'caption' => 'Sample Vimeo video for testing',
                    'is_active' => true,
                    'sort_order' => 0,
                ]
            );
        });
    }
}
