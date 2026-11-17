<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public const STATUSES = ['new', 'read', 'replied', 'archived'];

    public function index(Request $request)
    {
        $status = $request->string('status')->toString();
        $search = $request->string('search')->toString();

        $messages = ContactMessage::query()
            ->when(in_array($status, self::STATUSES, true), fn ($q) => $q->where('status', $status))
            ->when($search !== '', function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $counts = ContactMessage::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'filters' => ['status' => $status ?: 'all', 'search' => $search],
            'counts' => [
                'all' => (int) $counts->sum(),
                ...collect(self::STATUSES)->mapWithKeys(fn ($s) => [$s => (int) ($counts[$s] ?? 0)])->all(),
            ],
        ]);
    }

    /**
     * Change a message's status (opening a new message marks it as read).
     */
    public function update(Request $request, ContactMessage $message)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(self::STATUSES)],
        ]);

        $attributes = ['status' => $validated['status']];

        if ($validated['status'] !== 'new' && ! $message->read_at) {
            $attributes['read_at'] = now();
        }

        if ($validated['status'] === 'replied' && ! $message->replied_at) {
            $attributes['replied_at'] = now();
        }

        if ($validated['status'] === 'new') {
            $attributes['read_at'] = null;
        }

        $message->update($attributes);

        return back();
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }
}
