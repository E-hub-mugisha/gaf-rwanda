<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('position');
            $table->string('category')->default('research_assistant');

            // Netherlands, Rwanda or Both
            $table->string('affiliation')->default('rwanda');

            $table->string('institution')->nullable();
            $table->text('responsibilities')->nullable();

            // Optional reporting relationship
            $table->foreignId('reports_to_id')
                ->nullable()
                ->constrained('team_members')
                ->nullOnDelete();

            // Intervention group information
            $table->unsignedInteger('group_number')->nullable();
            $table->string('group_role')->nullable();

            $table->string('photo')->nullable();
            $table->unsignedInteger('sort_order')->default(0);

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index(['category', 'is_active']);
            $table->index(['group_number', 'group_role']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};