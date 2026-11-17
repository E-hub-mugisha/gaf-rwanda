<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_media', function (Blueprint $table) {
            $table->id();

            $table->foreignId('event_gallery_id')
                ->constrained('event_galleries')
                ->cascadeOnDelete();

            $table->string('type')->default('image');
            // image, video

            $table->string('disk')->default('public');

            $table->string('file_path')->nullable();

            $table->string('original_name')->nullable();
            $table->string('mime_type')->nullable();

            $table->unsignedBigInteger('file_size')->nullable();

            $table->string('external_url')->nullable();

            $table->string('alt_text')->nullable();
            $table->string('caption')->nullable();

            $table->boolean('is_featured')->default(false);

            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->index(['event_gallery_id', 'type']);
            $table->index(['is_featured', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_media');
    }
};