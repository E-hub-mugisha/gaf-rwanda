<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $faqs = Faq::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('question', 'like', "%{$search}%")
                        ->orWhere('answer', 'like', "%{$search}%")
                        ->orWhere('question_rw', 'like', "%{$search}%")
                        ->orWhere('answer_rw', 'like', "%{$search}%");
                });
            })
            ->when(in_array($request->status, ['active', 'inactive'], true), function ($query) use ($request) {
                $query->where('is_active', $request->status === 'active');
            })
            ->ordered()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => $faqs,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? 'all',
            ],
            'statistics' => [
                'total' => Faq::count(),
                'active' => Faq::where('is_active', true)->count(),
                'inactive' => Faq::where('is_active', false)->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // At least one language is required for each FAQ.
            'question' => ['nullable', 'required_without:question_rw', 'string', 'max:500'],
            'answer' => ['nullable', 'required_with:question', 'required_without:answer_rw', 'string'],
            'question_rw' => ['nullable', 'required_without:question', 'string', 'max:500'],
            'answer_rw' => ['nullable', 'required_with:question_rw', 'required_without:answer', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        Faq::create($validated);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ created successfully.');
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            // At least one language is required for each FAQ.
            'question' => ['nullable', 'required_without:question_rw', 'string', 'max:500'],
            'answer' => ['nullable', 'required_with:question', 'required_without:answer_rw', 'string'],
            'question_rw' => ['nullable', 'required_without:question', 'string', 'max:500'],
            'answer_rw' => ['nullable', 'required_with:question_rw', 'required_without:answer', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
        ]);

        $faq->update($validated);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully.');
    }

    public function toggleStatus(Faq $faq)
    {
        $faq->update([
            'is_active' => !$faq->is_active,
        ]);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ status updated successfully.');
    }
}
