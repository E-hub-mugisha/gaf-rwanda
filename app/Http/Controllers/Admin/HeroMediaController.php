<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class HeroMediaController extends Controller
{
    public function index()
    {
        $media = HeroMedia::query()
            ->orderBy('sort_order')
            ->latest()
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'youtube_url' => $item->youtube_url,
                'banner_image' => $item->banner_image_url,
                'alt_text' => $item->alt_text,
                'caption' => $item->caption,
                'is_active' => $item->is_active,
                'sort_order' => $item->sort_order,
                'created_at' => $item->created_at?->format('d M Y'),
            ]);

        return inertia('Admin/HeroMedia/Index', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateMedia($request);

        if ($request->hasFile('banner_image')) {
            $validated['banner_image'] = $request->file('banner_image')
                ->store('hero-media', 'uploads');
        }

        DB::transaction(function () use (&$validated) {
            if (!empty($validated['is_active'])) {
                HeroMedia::query()->update(['is_active' => false]);
            }

            HeroMedia::create($validated);
        });

        return back()->with('success', 'Hero media created successfully.');
    }

    public function update(Request $request, HeroMedia $heroMedia)
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'youtube_url' => ['nullable', 'url', 'max:2048'],
            'banner_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($request->hasFile('banner_image')) {
            if ($heroMedia->banner_image) {
                \Illuminate\Support\Facades\Storage::disk('uploads')
                    ->delete($heroMedia->banner_image);
            }

            $validated['banner_image'] = $request->file('banner_image')
                ->store('hero-media', 'uploads');
        } else {
            unset($validated['banner_image']);
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($heroMedia, $validated) {
            if (!empty($validated['is_active'])) {
                \App\Models\HeroMedia::where('id', '!=', $heroMedia->id)
                    ->update(['is_active' => false]);
            }

            $heroMedia->update($validated);
        });

        return back()->with('success', 'Hero media updated successfully.');
    }

    public function activate(HeroMedia $heroMedia)
    {
        DB::transaction(function () use ($heroMedia) {
            HeroMedia::query()->update(['is_active' => false]);

            $heroMedia->update(['is_active' => true]);
        });

        return back()->with('success', 'Homepage hero media activated.');
    }

    public function destroy(HeroMedia $heroMedia)
    {
        if ($heroMedia->banner_image) {
            Storage::disk('uploads')->delete($heroMedia->banner_image);
        }

        $heroMedia->delete();

        return back()->with('success', 'Hero media deleted successfully.');
    }

    private function validateMedia(Request $request): array
    {
        return $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'youtube_url' => [
                'nullable',
                'url',
                'max:2048',
                'required_without:banner_image',
            ],
            'banner_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
                'required_without:youtube_url',
            ],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
