
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_articles', function (Blueprint $table) {
            $table->string('title_rw')->nullable()->after('title');
            $table->string('excerpt_rw', 500)->nullable()->after('excerpt');
            $table->longText('content_rw')->nullable()->after('content');

            $table->string('meta_title_rw')->nullable()->after('meta_title');
            $table->string('meta_description_rw', 500)
                ->nullable()
                ->after('meta_description');
        });
    }

    public function down(): void
    {
        Schema::table('news_articles', function (Blueprint $table) {
            $table->dropColumn([
                'title_rw',
                'excerpt_rw',
                'content_rw',
                'meta_title_rw',
                'meta_description_rw',
            ]);
        });
    }
};
