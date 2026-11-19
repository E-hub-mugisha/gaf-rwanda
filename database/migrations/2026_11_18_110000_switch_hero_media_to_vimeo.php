<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * The homepage hero video now comes from Vimeo instead of YouTube.
 * Existing YouTube links cannot play in the Vimeo player, so they are cleared.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_media', function (Blueprint $table) {
            $table->renameColumn('youtube_url', 'vimeo_url');
        });

        Schema::table('hero_media', function (Blueprint $table) {
            $table->string('video_thumbnail', 2048)->nullable()->after('vimeo_url');
        });

        DB::table('hero_media')
            ->whereNotNull('vimeo_url')
            ->where('vimeo_url', 'not like', '%vimeo.com/%')
            ->update(['vimeo_url' => null]);
    }

    public function down(): void
    {
        Schema::table('hero_media', function (Blueprint $table) {
            $table->dropColumn('video_thumbnail');
        });

        Schema::table('hero_media', function (Blueprint $table) {
            $table->renameColumn('vimeo_url', 'youtube_url');
        });
    }
};
