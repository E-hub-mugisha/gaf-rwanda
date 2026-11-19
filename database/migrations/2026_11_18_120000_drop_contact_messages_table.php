<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/**
 * The contact form and the admin Messages page were removed, so the table
 * that stored the messages is no longer needed.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('contact_messages');
    }

    public function down(): void
    {
        // The feature no longer exists; nothing to restore.
    }
};
