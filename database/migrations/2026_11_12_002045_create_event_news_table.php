<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_news', function (Blueprint $table) {
            $table->id();

            $table->foreignId('event_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('news_article_id')
                ->constrained('news_articles')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique(['event_id', 'news_article_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_news');
    }
};