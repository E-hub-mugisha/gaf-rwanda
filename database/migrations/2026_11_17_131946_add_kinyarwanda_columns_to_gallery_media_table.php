
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_media', function (Blueprint $table) {
            $table->string('alt_text_rw')->nullable()->after('alt_text');
            $table->string('caption_rw')->nullable()->after('caption');
        });
    }

    public function down(): void
    {
        Schema::table('gallery_media', function (Blueprint $table) {
            $table->dropColumn([
                'alt_text_rw',
                'caption_rw',
            ]);
        });
    }
};
