<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_media', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('caption')->nullable();
            $table->boolean('is_active')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_media');
    }
};