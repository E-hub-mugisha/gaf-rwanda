<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'documents' => Document::count(),
            'users' => User::where('role', 'user')->count(),
            'admins' => User::where('role', 'admin')->count(),
        ];

        $recentDocuments = Document::with('versions')->latest()->take(5)->get()->map(fn ($doc) => [
            'id' => $doc->id,
            'title' => $doc->title,
            'created_at_human' => $doc->created_at->diffForHumans(),
            'versions' => $doc->versions->map(fn ($v) => [
                'id' => $v->id,
                'language' => $v->language,
                'language_label' => $v->languageLabel(),
            ]),
        ]);

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentDocuments'));
    }
}
