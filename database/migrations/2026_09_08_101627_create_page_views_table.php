<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Example: depression
            $table->string('page', 150);

            // Current URL
            $table->text('url')->nullable();

            // rw, en, fr, nl
            $table->string('language', 10)->nullable();

            $table->string('ip_address', 45)->nullable();

            $table->text('user_agent')->nullable();

            $table->timestamps();

            $table->index(['page', 'created_at']);
            $table->index(['user_id', 'page', 'created_at']);
            $table->index(['language', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_views');
    }
};
