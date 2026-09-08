<?php

namespace App\Http\Controllers;

use App\Models\HealthContent;
use Inertia\Inertia;

class DepressionController extends Controller
{
    public function show()
    {
        $page = HealthContent::where('slug', 'depression')
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('Health/Depression', [
            'page' => [
                'title' => $page->page_title,
                'content' => $page->content,
            ],
        ]);
    }
}