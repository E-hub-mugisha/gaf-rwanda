<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventGallery;
use App\Models\GalleryMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GalleryMediaController extends Controller
{
    /**
     * Display media belonging to an event gallery.
     */
    public function index(Event $event, EventGallery $gallery)
    {
        $this->ensureGalleryBelongsToEvent($event, $gallery);

        $media = $gallery->media()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Events/Galleries/Media/Index', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
            ],

            'gallery' => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'slug' => $gallery->slug,
                'description' => $gallery->description,
                'title_rw' => $gallery->title_rw,
                'description_rw' => $gallery->description_rw,
                'cover_image' => $gallery->cover_image,
            ],

            'media' => $media,
        ]);
    }

    /**
     * Store new media.
     */
    public function store(Request $request, Event $event, EventGallery $gallery)
    {
        $this->ensureGalleryBelongsToEvent($event, $gallery);

        $validated = $this->validateMedia($request);

        if (!$request->hasFile('file') && empty($validated['external_url'])) {
            throw ValidationException::withMessages([
                'file' => 'Please upload a file or provide an external media URL.',
            ]);
        }

        $fileData = $this->storeUploadedFile(
            $request,
            $event,
            $gallery
        );

        $gallery->media()->create([
            'type' => $validated['type'],
            'disk' => $fileData['disk'],
            'file_path' => $fileData['file_path'],
            'original_name' => $fileData['original_name'],
            'mime_type' => $fileData['mime_type'],
            'file_size' => $fileData['file_size'],
            'external_url' => $request->hasFile('file')
                ? null
                : ($validated['external_url'] ?? null),
            'alt_text' => $validated['alt_text'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'alt_text_rw' => $validated['alt_text_rw'] ?? null,
            'caption_rw' => $validated['caption_rw'] ?? null,
            'is_featured' => $validated['is_featured'],
            'sort_order' => $validated['sort_order'],
        ]);

        return back()->with('success', 'Media uploaded successfully.');
    }

    /**
     * Update existing media.
     */
    public function update(
        Request $request,
        Event $event,
        EventGallery $gallery,
        GalleryMedia $media
    ) {
        $this->ensureGalleryBelongsToEvent($event, $gallery);
        $this->ensureMediaBelongsToGallery($gallery, $media);

        $validated = $this->validateMedia($request);

        $attributes = [
            'type' => $validated['type'],
            'alt_text' => $validated['alt_text'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'alt_text_rw' => $validated['alt_text_rw'] ?? null,
            'caption_rw' => $validated['caption_rw'] ?? null,
            'is_featured' => $validated['is_featured'],
            'sort_order' => $validated['sort_order'],
        ];

        // Replace with a newly uploaded file.
        if ($request->hasFile('file')) {
            $this->deleteStoredFile($media);

            $fileData = $this->storeUploadedFile(
                $request,
                $event,
                $gallery
            );

            $attributes = array_merge($attributes, [
                'disk' => $fileData['disk'],
                'file_path' => $fileData['file_path'],
                'original_name' => $fileData['original_name'],
                'mime_type' => $fileData['mime_type'],
                'file_size' => $fileData['file_size'],
                'external_url' => null,
            ]);
        } elseif (!empty($validated['external_url'])) {
            // Replace an uploaded file with an external URL.
            $this->deleteStoredFile($media);

            $attributes = array_merge($attributes, [
                'file_path' => null,
                'original_name' => null,
                'mime_type' => null,
                'file_size' => null,
                'external_url' => $validated['external_url'],
            ]);
        } elseif (!$media->file_path && !$media->external_url) {
            throw ValidationException::withMessages([
                'file' => 'Please upload a file or provide an external media URL.',
            ]);
        }

        $media->update($attributes);

        return back()->with('success', 'Media updated successfully.');
    }

    /**
     * Delete media.
     */
    public function destroy(
        Event $event,
        EventGallery $gallery,
        GalleryMedia $media
    ) {
        $this->ensureGalleryBelongsToEvent($event, $gallery);
        $this->ensureMediaBelongsToGallery($gallery, $media);

        $this->deleteStoredFile($media);

        $media->delete();

        return back()->with('success', 'Media deleted successfully.');
    }

    /**
     * Validate media input.
     */
    private function validateMedia(Request $request): array
    {
        $type = $request->input('type', 'image');

        $fileRules = [
            'nullable',
            'file',
            'max:102400',
        ];

        if ($type === 'image') {
            $fileRules = [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:10240',
            ];
        } elseif ($type === 'video') {
            $fileRules = [
                'nullable',
                'file',
                'mimes:mp4,mov,webm',
                'max:102400',
            ];
        }

        return $request->validate([
            'type' => [
                'required',
                Rule::in(['image', 'video']),
            ],

            'file' => $fileRules,

            'external_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'alt_text' => [
                'nullable',
                'string',
                'max:255',
            ],

            'caption' => [
                'nullable',
                'string',
                'max:255',
            ],

            'alt_text_rw' => ['nullable', 'string', 'max:255'],
            'caption_rw' => ['nullable', 'string', 'max:255'],

            'is_featured' => [
                'required',
                'boolean',
            ],

            'sort_order' => [
                'required',
                'integer',
                'min:0',
            ],
        ]);
    }

    /**
     * Save an uploaded file.
     */
    private function storeUploadedFile(
        Request $request,
        Event $event,
        EventGallery $gallery
    ): array {
        if (!$request->hasFile('file')) {
            return [
                'disk' => 'uploads',
                'file_path' => null,
                'original_name' => null,
                'mime_type' => null,
                'file_size' => null,
            ];
        }

        $file = $request->file('file');

        $path = $file->store(
            "event-galleries/{$event->id}/{$gallery->id}",
            'uploads'
        );

        return [
            'disk' => 'uploads',
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ];
    }

    /**
     * Delete a previously uploaded file.
     */
    private function deleteStoredFile(GalleryMedia $media): void
    {
        if ($media->file_path && Storage::disk($media->disk)->exists($media->file_path)) {
            Storage::disk($media->disk)->delete($media->file_path);
        }
    }

    /**
     * Verify gallery belongs to event.
     */
    private function ensureGalleryBelongsToEvent(
        Event $event,
        EventGallery $gallery
    ): void {
        abort_unless(
            $gallery->event_id === $event->id,
            404
        );
    }

    /**
     * Verify media belongs to gallery.
     */
    private function ensureMediaBelongsToGallery(
        EventGallery $gallery,
        GalleryMedia $media
    ): void {
        abort_unless(
            $media->event_gallery_id === $gallery->id,
            404
        );
    }
}