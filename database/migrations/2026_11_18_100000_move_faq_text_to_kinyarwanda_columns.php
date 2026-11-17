<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * The FAQs were written in Kinyarwanda but stored in the English columns.
 * Move them into question_rw / answer_rw and make English optional
 * (each FAQ needs at least one language; the website falls back to the other).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->string('question')->nullable()->change();
            $table->longText('answer')->nullable()->change();
        });

        // Only rows that have no Kinyarwanda version yet.
        DB::table('faqs')
            ->where(fn ($q) => $q->whereNull('question_rw')->orWhere('question_rw', ''))
            ->update([
                'question_rw' => DB::raw('question'),
                'answer_rw' => DB::raw('answer'),
                'question' => null,
                'answer' => null,
            ]);
    }

    public function down(): void
    {
        // Put the Kinyarwanda text back where English is empty.
        DB::table('faqs')
            ->where(fn ($q) => $q->whereNull('question')->orWhere('question', ''))
            ->update([
                'question' => DB::raw('question_rw'),
                'answer' => DB::raw('answer_rw'),
                'question_rw' => null,
                'answer_rw' => null,
            ]);

        Schema::table('faqs', function (Blueprint $table) {
            $table->string('question')->nullable(false)->change();
            $table->longText('answer')->nullable(false)->change();
        });
    }
};
