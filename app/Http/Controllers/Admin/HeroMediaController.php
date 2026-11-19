<?php

namespace App\Http\Controllers\Admin;

use App\Support\FileUpload;
use App\Http\Controllers\Controller;
use App\Models\HeroMedia;
use App\Support\Vimeo;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
                'vimeo_url' => $item->vimeo_url,
                'video_thumbnail' => $item->video_thumbnail,
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

        $validated['banner_image'] = FileUpload::fromRequest($request, 'banner_image', 'hero-media');

        $validated['video_thumbnail'] = Vimeo::thumbnail($validated['vimeo_url'] ?? null);

        DB::transaction(function () use ($validated) {
            if (!empty($validated['is_active'])) {
                HeroMedia::query()->update(['is_active' => false]);
            }

            HeroMedia::create($validated);
        });

        return back()->with('success', 'Hero media created successfully.');
    }

    public function update(Request $request, HeroMedia $heroMedia)
    {
        $validated = $this->validateMedia($request, $heroMedia);

        if ($request->hasFile('banner_image')) {
            $validated['banner_image'] = FileUpload::replace($request, 'banner_image', 'hero-media', $heroMedia->banner_image);
        } else {
            unset($validated['banner_image']);
        }

        // Only ask Vimeo for a new thumbnail when the link changed.
        $url = $validated['vimeo_url'] ?? null;
        if ($url !== $heroMedia->vimeo_url || ($url && !$heroMedia->video_thumbnail)) {
            $validated['video_thumbnail'] = Vimeo::thumbnail($url);
        }

        DB::transaction(function () use ($heroMedia, $validated) {
            if (!empty($validated['is_active'])) {
                HeroMedia::where('id', '!=', $heroMedia->id)
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
        FileUpload::delete($heroMedia->banner_image);

        $heroMedia->delete();

        return back()->with('success', 'Hero media deleted successfully.');
    }

    /**
     * A hero needs a Vimeo video or a banner image. When editing, an image
     * that is already saved counts.
     */
    private function validateMedia(Request $request, ?HeroMedia $heroMedia = null): array
    {
        $hasImage = (bool) $heroMedia?->banner_image;

        return $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'vimeo_url' => [
                'nullable',
                'url',
                'max:2048',
                $hasImage ? 'nullable' : 'required_without:banner_image',
                function (string $attribute, mixed $value, Closure $fail) {
                    if ($value && !Vimeo::isValid($value)) {
                        $fail('Please enter a valid Vimeo video link, e.g. https://vimeo.com/76979871.');
                    }
                },
            ],
            'banner_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
                $hasImage ? 'nullable' : 'required_without:vimeo_url',
            ],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ], [
            'vimeo_url.required_without' => 'Add a Vimeo video link or upload a banner image.',
            'banner_image.required_without' => 'Add a Vimeo video link or upload a banner image.',
        ]);
    }
}
