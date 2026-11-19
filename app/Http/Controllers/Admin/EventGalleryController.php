<?php

namespace App\Http\Controllers\Admin;

use App\Support\FileUpload;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EventGalleryController extends Controller
{
    public function index(Event $event)
    {
        $galleries = $event->galleries()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Events/Galleries/Index', [
            'event' => $event->only('id', 'title', 'slug'),
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $this->validateGallery($request, $event);

        $validated['slug'] = $this->generateUniqueSlug(
            $event,
            $validated['slug'] ?: $validated['title']
        );

        $validated['cover_image'] = FileUpload::fromRequest($request, 'cover_image', 'event-galleries');

        $event->galleries()->create($validated);

        return back()->with('success', 'Gallery created successfully.');
    }

    public function update(
        Request $request,
        Event $event,
        EventGallery $gallery
    ) {
        abort_unless($gallery->event_id === $event->id, 404);

        $validated = $this->validateGallery(
            $request,
            $event,
            $gallery
        );

        $validated['slug'] = $this->generateUniqueSlug(
            $event,
            $validated['slug'] ?: $validated['title'],
            $gallery->id
        );

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = FileUpload::replace($request, 'cover_image', 'event-galleries', $gallery->cover_image);
        } else {
            unset($validated['cover_image']);
        }

        $gallery->update($validated);

        return back()->with('success', 'Gallery updated successfully.');
    }

    public function destroy(Event $event, EventGallery $gallery)
    {
        abort_unless($gallery->event_id === $event->id, 404);

        FileUpload::delete($gallery->cover_image);

        // Remove the photos and videos uploaded to this gallery.
        foreach ($gallery->media()->whereNotNull('file_path')->pluck('file_path') as $path) {
            FileUpload::delete($path);
        }

        $gallery->delete();

        return back()->with('success', 'Gallery deleted successfully.');
    }

    private function validateGallery(
        Request $request,
        Event $event,
        ?EventGallery $gallery = null
    ): array {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'title_rw' => ['nullable', 'string', 'max:255'],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('event_galleries', 'slug')
                    ->where('event_id', $event->id)
                    ->ignore($gallery?->id),
            ],

            'description' => ['nullable', 'string'],
            'description_rw' => ['nullable', 'string'],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'is_public' => ['required', 'boolean'],

            'sort_order' => ['required', 'integer', 'min:0'],
        ]);
    }

    private function generateUniqueSlug(
        Event $event,
        string $value,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($value) ?: 'gallery';
        $slug = $baseSlug;
        $counter = 1;

        while (
            $event->galleries()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }
}
