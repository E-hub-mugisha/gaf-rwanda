<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->string('position_rw')->nullable();
            $table->string('institution_rw')->nullable();
            $table->text('responsibilities_rw')->nullable();
            $table->string('group_role_rw')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn([
                'position_rw',
                'institution_rw',
                'responsibilities_rw',
                'group_role_rw',
            ]);
        });
    }
};