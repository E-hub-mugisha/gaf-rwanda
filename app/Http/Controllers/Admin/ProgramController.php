<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $programs = Program::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->when($status && $status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderBy('sort_order')
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($program) => [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'short_description' => $program->short_description,
                'cover_image' => $program->cover_image,
                'status' => $program->status,
                'start_date' => $program->start_date?->format('Y-m-d'),
                'end_date' => $program->end_date?->format('Y-m-d'),
                'is_featured' => $program->is_featured,
                'sort_order' => $program->sort_order,
                'created_at' => $program->created_at?->format('d M Y'),
            ]);

        return Inertia::render('Admin/Programs/Index', [
            'programs' => $programs,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? 'all',
            ],
            'statistics' => [
                'total' => Program::count(),
                'active' => Program::where('status', 'active')->count(),
                'inactive' => Program::where('status', 'inactive')->count(),
                'completed' => Program::where('status', 'completed')->count(),
                'featured' => Program::where('is_featured', true)->count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Programs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:programs,slug'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'status' => ['required', Rule::in(['active', 'inactive', 'completed'])],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title']
        );

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')
                ->store('programs', 'uploads');
        }

        Program::create($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program created successfully.');
    }

    public function show(Program $program)
    {
        return Inertia::render('Admin/Programs/Show', [
            'program' => [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'short_description' => $program->short_description,
                'description' => $program->description,
                'cover_image' => $program->cover_image,
                'status' => $program->status,
                'start_date' => $program->start_date?->format('d M Y'),
                'end_date' => $program->end_date?->format('d M Y'),
                'is_featured' => $program->is_featured,
                'sort_order' => $program->sort_order,
                'created_at' => $program->created_at?->format('d M Y'),
                'updated_at' => $program->updated_at?->format('d M Y'),
            ],
        ]);
    }

    public function edit(Program $program)
    {
        return Inertia::render('Admin/Programs/Edit', [
            'program' => [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'short_description' => $program->short_description,
                'description' => $program->description,
                'cover_image' => $program->cover_image,
                'status' => $program->status,
                'start_date' => $program->start_date?->format('Y-m-d'),
                'end_date' => $program->end_date?->format('Y-m-d'),
                'is_featured' => $program->is_featured,
                'sort_order' => $program->sort_order,
            ],
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('programs', 'slug')->ignore($program->id),
            ],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'status' => ['required', Rule::in(['active', 'inactive', 'completed'])],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['slug'] ?: $validated['title'],
            $program->id
        );

        if ($request->hasFile('cover_image')) {
            if ($program->cover_image) {
                Storage::disk('uploads')->delete($program->cover_image);
            }

            $validated['cover_image'] = $request->file('cover_image')
                ->store('programs', 'uploads');
        } else {
            unset($validated['cover_image']);
        }

        $program->update($validated);

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        // Keep the image when soft-deleting so it remains available
        // if the program is restored in the future.
        $program->delete();

        return redirect()
            ->route('admin.programs.index')
            ->with('success', 'Program moved to the trash successfully.');
    }

    private function generateUniqueSlug(string $value, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($value);
        $slug = $baseSlug ?: 'program';
        $counter = 1;

        while (
            Program::withTrashed()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}