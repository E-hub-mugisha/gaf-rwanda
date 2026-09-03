<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('document_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained('documents')->cascadeOnDelete();
            $table->enum('language', ['en', 'es', 'rw']); // English, Spanish, Kinyarwanda
            $table->string('file_path');        // relative path inside storage/app
            $table->string('original_filename');
            $table->unsignedBigInteger('file_size')->default(0); // bytes
            $table->timestamps();

            $table->unique(['document_id', 'language']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_versions');
    }
};
