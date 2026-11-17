<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * The EventGallery model and the public gallery pages already expect these
 * Kinyarwanda columns, but they were never created.
 * (gallery_media columns are added by 2026_11_17_131946_add_kinyarwanda_columns_to_gallery_media_table.)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('event_galleries', function (Blueprint $table) {
            if (! Schema::hasColumn('event_galleries', 'title_rw')) {
                $table->string('title_rw')->nullable()->after('title');
            }

            if (! Schema::hasColumn('event_galleries', 'description_rw')) {
                $table->text('description_rw')->nullable()->after('description');
            }
        });
    }

    public function down(): void
    {
        Schema::table('event_galleries', function (Blueprint $table) {
            $table->dropColumn(['title_rw', 'description_rw']);
        });
    }
};
