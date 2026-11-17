<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('title_rw')->nullable();
            $table->text('excerpt_rw')->nullable();
            $table->longText('description_rw')->nullable();

            $table->string('venue_rw')->nullable();
            $table->string('address_rw')->nullable();
            $table->string('city_rw')->nullable();

            $table->json('agenda_rw')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'title_rw',
                'excerpt_rw',
                'description_rw',
                'venue_rw',
                'address_rw',
                'city_rw',
                'agenda_rw',
            ]);
        });
    }
};