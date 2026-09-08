<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HealthContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthContentController extends Controller
{
    public function show()
    {
        $page = HealthContent::where(
            'slug',
            'depression'
        )->firstOrFail();

        return Inertia::render(
            'Admin/HealthContent/Show',
            [
                'page' => $page,
            ]
        );
    }

    public function edit()
    {
        $page = HealthContent::where(
            'slug',
            'depression'
        )->firstOrFail();

        return Inertia::render(
            'Admin/HealthContent/Edit',
            [
                'page' => $page,
            ]
        );
    }

    public function update(Request $request)
    {
        $page = HealthContent::where(
            'slug',
            'depression'
        )->firstOrFail();

        $validated = $request->validate([
            'content' => ['required', 'array'],
            'is_published' => ['required', 'boolean'],
        ]);

        $page->update([
            'content' => $validated['content'],
            'is_published' => $validated['is_published'],
        ]);

        return back()->with(
            'success',
            'Depression content updated successfully.'
        );
    }
}
